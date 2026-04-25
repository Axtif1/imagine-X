import React, { useEffect } from 'react'
import { Button } from '../../components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { getReports } from '../../features/admin/adminSlice'
import { toast } from 'react-toastify'
import { deleteAdminPost, dismissReport } from '../../features/admin/adminSlice.js'

export const AdminReports = () => {
  const dispatch = useDispatch()
  const { reports, adminLoading, adminError, adminErrorMessage } = useSelector(state => state.admin)

  useEffect(() => {
    dispatch(getReports())
  }, [])

  useEffect(() => {
    if (adminError && adminErrorMessage) {
      toast.error(adminErrorMessage, { position: "top-center", theme: "dark" })
    }
  }, [adminError, adminErrorMessage])

  const handleDeletePost = (pid, rid) => {
    dispatch(deleteAdminPost(pid))
        .unwrap()
        .then(() => toast.success("Post deleted", { position: "top-center", theme: "dark" }))
        .catch(err => toast.error(err, { position: "top-center", theme: "dark" }))
}

const handleDismiss = (rid) => {
    dispatch(dismissReport(rid))
        .unwrap()
        .then(() => toast.success("Report dismissed", { position: "top-center", theme: "dark" }))
        .catch(err => toast.error(err, { position: "top-center", theme: "dark" }))
}

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Reported Content</h1>
        <span className="text-zinc-400 text-sm">{reports.length} reports total</span>
      </div>
      
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm text-zinc-400">
          <thead className="bg-zinc-950/50 text-zinc-300 uppercase">
            <tr>
              <th className="px-6 py-4 font-medium">Post</th>
              <th className="px-6 py-4 font-medium">Reported By</th>
              <th className="px-6 py-4 font-medium">Reason</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {adminLoading ? (
              [...Array(3)].map((_, i) => (
                <tr key={i}>
                  <td className="px-6 py-4" colSpan={5}>
                    <div className="h-8 bg-zinc-800 rounded animate-pulse" />
                  </td>
                </tr>
              ))
            ) : reports.length === 0 ? (
              <tr>
                <td className="px-6 py-8 text-center text-zinc-500" colSpan={5}>
                  No reports found. Everything looks clean! ✅
                </td>
              </tr>
            ) : reports.map((report) => (
              <tr key={report._id} className="hover:bg-zinc-800/20 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {report.post?.imageLink && (
                      <img
                        src={report.post.imageLink}
                        alt="reported post"
                        className="w-12 h-12 rounded object-cover bg-zinc-800"
                        onError={(e) => { e.target.style.display = 'none' }}
                      />
                    )}
                    <span className="truncate max-w-[160px] text-xs leading-tight text-zinc-400">
                      {report.post?.prompt || report.post?._id || '—'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-zinc-200">
                  @{report.user?.name || '—'}
                </td>
                <td className="px-6 py-4 text-red-400 max-w-xs truncate">
                  {report.text}
                </td>
                <td className="px-6 py-4 text-zinc-500 text-xs">
                  {report.createdAt ? new Date(report.createdAt).toLocaleDateString() : '—'}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <Button 
    variant="secondary" 
    size="sm"
    onClick={() => handleDismiss(report._id)}
    disabled={adminLoading}
>
    Dismiss
</Button>
<Button
    variant="danger"
    size="sm"
    className="bg-red-900/40 text-red-400 hover:bg-red-900/60"
    onClick={() => handleDeletePost(report.post?._id, report._id)}
    disabled={adminLoading}
>
    Delete Post
</Button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
