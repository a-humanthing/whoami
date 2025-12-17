import { prisma } from "@/lib/prisma";
import { Users, Clock, Globe, MessageSquare, MousePointerClick } from "lucide-react";

export const dynamic = 'force-dynamic'; // Ensure real-time data

async function getStats() {
  const [
    totalVisitors,
    totalSessions,
    totalPageViews,
    submissions,
    visitorsByCountry
  ] = await Promise.all([
    prisma.visitor.count(),
    prisma.session.count(),
    prisma.pageView.count(),
    prisma.contactSubmission.findMany({ 
        orderBy: { submittedAt: 'desc' },
        take: 10 
    }),
    prisma.visitor.groupBy({
        by: ['country'],
        _count: {
            country: true
        },
        orderBy: {
            _count: {
                country: 'desc'
            }
        },
        take: 5
    })
  ]);

  // Calculate Avg Duration
  // Note: aggregate on duration might overflow if not careful, but for small portfolio ok
  const durationAgg = await prisma.session.aggregate({
    _avg: { duration: true }
  });

  return {
    totalVisitors,
    totalSessions,
    totalPageViews,
    submissions,
    visitorsByCountry,
    avgDuration: durationAgg._avg.duration || 0
  };
}

export default async function AdminPage() {
  const stats = await getStats();

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-white/10 p-6 rounded-xl">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/20 text-blue-400 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Total Visitors</p>
              <h3 className="text-2xl font-bold">{stats.totalVisitors}</h3>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-white/10 p-6 rounded-xl">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500/20 text-purple-400 rounded-lg">
              <MousePointerClick className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Page Views</p>
              <h3 className="text-2xl font-bold">{stats.totalPageViews}</h3>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-white/10 p-6 rounded-xl">
           <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/20 text-green-400 rounded-lg">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Avg Duration</p>
              <h3 className="text-2xl font-bold">
                {Math.floor(stats.avgDuration / 60)}m {Math.round(stats.avgDuration % 60)}s
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-white/10 p-6 rounded-xl">
           <div className="flex items-center gap-4">
            <div className="p-3 bg-pink-500/20 text-pink-400 rounded-lg">
               <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Messages</p>
              <h3 className="text-2xl font-bold">{stats.submissions.length}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Submissions */}
        <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h3 className="font-semibold text-lg">Recent Messages</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-slate-400 bg-white/5 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Message</th>
                  <th className="px-6 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {stats.submissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-white/5">
                    <td className="px-6 py-4 font-medium">
                      {sub.name}
                      <div className="text-xs text-slate-500 font-normal">{sub.email}</div>
                    </td>
                    <td className="px-6 py-4 truncate max-w-xs">{sub.message}</td>
                    <td className="px-6 py-4 text-slate-400">
                      {new Date(sub.submittedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                 {stats.submissions.length === 0 && (
                    <tr>
                        <td colSpan={3} className="px-6 py-8 text-center text-slate-500">No messages yet</td>
                    </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Visitors by Country */}
        <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden h-fit">
          <div className="p-6 border-b border-white/10">
            <h3 className="font-semibold text-lg flex items-center gap-2">
                <Globe className="w-5 h-5" /> Top Countries
            </h3>
          </div>
          <div className="p-6">
              <div className="space-y-4">
                {stats.visitorsByCountry.map((loc) => (
                    <div key={loc.country || 'Unknown'} className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <span className="text-2xl">
                                {loc.country === 'Local' ? '🏠' : '🌍'} 
                            </span>
                            <span className="font-medium text-slate-200">
                                {loc.country || 'Unknown'}
                            </span>
                         </div>
                         <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-mono">
                             {loc._count.country}
                         </span>
                    </div>
                ))}
                 {stats.visitorsByCountry.length === 0 && (
                     <p className="text-center text-slate-500">No data available</p>
                )}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
