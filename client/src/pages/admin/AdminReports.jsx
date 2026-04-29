import React, { useEffect, useState } from 'react'
import { Button } from '../../components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { getReports, deleteAdminPost, dismissReport, updateReport } from '../../features/admin/adminSlice'
import { toast } from 'react-toastify'
import { Filter, AlertTriangle, CheckCircle, Trash2, EyeOff, ShieldAlert } from 'lucide-react'
import { Link } from 'react-router-dom'

export const AdminReports = () => {
  const dispatch = useDispatch()
  const { reports, adminLoading, adminError, adminErrorMessage } = useSelector(state => state.admin)

  const [filter, setFilter] = useState('All'); // All, Pending, Resolved
  const [actionModal, setActionModal] = useState({ type: null, report: null }); // type: 'delete' | 'dismiss' | 'resolve'

  useEffect(() => {
    dispatch(getReports())
  }, [dispatch])

  useEffect(() => {
    if (adminError && adminErrorMessage) {
      toast.error(adminErrorMessage, { position: "top-center", theme: "dark" })
    }
  }, [adminError, adminErrorMessage])

  const filteredReports = reports.filter(r => {
    if (filter === 'Pending') return r.status !== 'resolved';
    if (filter === 'Resolved') return r.status === 'resolved';
    return true;
  });

  const confirmAction = () => {
    const { type, report } = actionModal;
    
    if (type === 'delete') {
      dispatch(deleteAdminPost(report.post?._id))
        .unwrap()
        .then(() => {
          toast.success("Post deleted and report resolved", { position: "top-center", theme: "dark" });
          setActionModal({ type: null, report: null });
        })
        .catch(err => toast.error(err, { position: "top-center", theme: "dark" }));
    } else if (type === 'dismiss') {
      dispatch(dismissReport(report._id))
        .unwrap()
        .then(() => {
          toast.success("Report dismissed", { position: "top-center", theme: "dark" });
          setActionModal({ type: null, report: null });
        })
        .catch(err => toast.error(err, { position: "top-center", theme: "dark" }));
    } else if (type === 'resolve') {
      dispatch(updateReport({ rid: report._id, data: { status: 'resolved' } }))
        .unwrap()
        .then(() => {
          toast.success("Report marked as resolved", { position: "top-center", theme: "dark" });
          setActionModal({ type: null, report: null });
        })
        .catch(err => toast.error(err, { position: "top-center", theme: "dark" }));
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fadeIn text-white pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reported Content</h1>
          <p className="text-zinc-400 text-sm mt-1">{filteredReports.length} reports total</p>
        </div>
        
        <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 p-2 rounded-xl">
          <Filter className="h-4 w-4 text-zinc-400 ml-2" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-transparent border-none px-2 py-1 text-sm text-zinc-100 focus:outline-none focus:ring-0 cursor-pointer"
          >
            <option className="bg-zinc-900" value="All">All Reports</option>
            <option className="bg-zinc-900" value="Pending">Pending</option>
            <option className="bg-zinc-900" value="Resolved">Resolved</option>
          </select>
        </div>
      </div>
      
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden overflow-x-auto">
        <table className="w-full text-left text-sm text-zinc-400 min-w-[800px]">
          <thead className="bg-zinc-950/50 text-zinc-300 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4 font-medium w-64">Reported Post</th>
              <th className="px-6 py-4 font-medium">Reporter</th>
              <th className="px-6 py-4 font-medium w-1/4">Reason</th>
              <th className="px-6 py-4 font-medium">Status & Date</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {adminLoading && reports.length === 0 ? (
              [...Array(3)].map((_, i) => (
                <tr key={i}>
                  <td className="px-6 py-4" colSpan={5}>
                    <div className="h-12 bg-zinc-800 rounded animate-pulse" />
                  </td>
                </tr>
              ))
            ) : filteredReports.length === 0 ? (
              <tr>
                <td className="px-6 py-12 text-center text-zinc-500" colSpan={5}>
                  No reports found matching the selected filter.
                </td>
              </tr>
            ) : filteredReports.map((report) => (
              <tr key={report._id} className="hover:bg-zinc-800/30 transition-colors">
                <td className="px-6 py-4">
                  {report.post ? (
                    <div className="flex items-center gap-3">
                      <Link to={`/post/${report.post._id}`} className="shrink-0 relative group">
                        <img
                          src={report.post.imageLink}
                          alt="reported post"
                          className="w-14 h-14 rounded-lg object-cover bg-zinc-800 border border-zinc-700 group-hover:brightness-75 transition-all"
                          onError={(e) => { e.target.style.display = 'none' }}
                        />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <p className="text-zinc-200 text-xs font-medium truncate" title={report.post.prompt}>
                          {report.post.prompt || 'No prompt available'}
                        </p>
                        <p className="text-zinc-500 text-[10px] mt-1">ID: {report.post._id.substring(0, 8)}...</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 text-zinc-500 italic">
                      <div className="w-14 h-14 rounded-lg bg-zinc-800 border border-zinc-700 border-dashed flex items-center justify-center">
                        <AlertTriangle className="h-4 w-4" />
                      </div>
                      Post already deleted
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 font-medium text-zinc-200">
                  {report.user?.name ? (
                     <Link to={`/profile/${report.user.name}`} className="hover:text-violet-400 transition-colors flex items-center gap-2">
                       <div className="w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center text-[10px] shrink-0">
                         {report.user.name.charAt(0).toUpperCase()}
                       </div>
                       @{report.user.name}
                     </Link>
                   ) : '—'}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-start gap-2 bg-red-950/20 p-2.5 rounded-lg border border-red-900/30">
                    <ShieldAlert className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                    <p className="text-red-300 text-xs leading-relaxed line-clamp-3" title={report.text}>
                      {report.text}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1.5">
                    {report.status === 'resolved' ? (
                      <span className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-green-400 bg-green-400/10 w-fit px-2 py-0.5 rounded-full">
                        <CheckCircle className="h-3 w-3" /> Resolved
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-orange-400 bg-orange-400/10 w-fit px-2 py-0.5 rounded-full">
                        <AlertTriangle className="h-3 w-3" /> Pending
                      </span>
                    )}
                    <span className="text-zinc-500 text-[10px]">
                      {report.createdAt ? new Date(report.createdAt).toLocaleDateString() : '—'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <div className="flex justify-end gap-2">
                    {report.status !== 'resolved' && (
                      <Button 
                        variant="secondary" 
                        size="sm"
                        className="h-8 px-3 text-xs bg-green-900/20 text-green-400 hover:bg-green-900/40"
                        onClick={() => setActionModal({ type: 'resolve', report })}
                        disabled={adminLoading}
                      >
                        <CheckCircle className="h-3 w-3 mr-1" /> Resolve
                      </Button>
                    )}
                    
                    {report.post && (
                      <Button
                        variant="danger"
                        size="sm"
                        className="h-8 px-3 text-xs"
                        onClick={() => setActionModal({ type: 'delete', report })}
                        disabled={adminLoading}
                      >
                        <Trash2 className="h-3 w-3 mr-1" /> Delete Post
                      </Button>
                    )}

                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-8 w-8 px-0 text-zinc-500 hover:text-zinc-300"
                      onClick={() => setActionModal({ type: 'dismiss', report })}
                      disabled={adminLoading}
                      title="Dismiss Report"
                    >
                      <EyeOff className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action Confirmation Modal */}
      {actionModal.type && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-sm animate-fadeIn text-center">
            
            {actionModal.type === 'delete' && (
              <>
                <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Delete Post?</h2>
                <p className="text-zinc-400 text-sm mb-6">
                  Are you sure you want to delete this reported post? This action cannot be undone.
                </p>
              </>
            )}

            {actionModal.type === 'dismiss' && (
              <>
                <div className="w-12 h-12 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center mx-auto mb-4">
                  <EyeOff className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Dismiss Report?</h2>
                <p className="text-zinc-400 text-sm mb-6">
                  This will remove the report from the system without taking action on the post.
                </p>
              </>
            )}

            {actionModal.type === 'resolve' && (
              <>
                <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Mark as Resolved?</h2>
                <p className="text-zinc-400 text-sm mb-6">
                  This report will be marked as resolved but kept in the system for record-keeping.
                </p>
              </>
            )}

            <div className="flex gap-3">
              <Button variant="secondary" className="flex-1" onClick={() => setActionModal({ type: null, report: null })}>Cancel</Button>
              <Button 
                variant={actionModal.type === 'delete' ? 'danger' : 'primary'} 
                className={`flex-1 ${actionModal.type === 'resolve' ? 'bg-green-600 hover:bg-green-500 text-white' : ''}`}
                onClick={confirmAction} 
                disabled={adminLoading}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
