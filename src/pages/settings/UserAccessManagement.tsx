import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Plus, Edit, Trash2, Shield } from 'lucide-react';
import { admins, hotelBranches } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

export default function UserAccessManagement() {
  const { user } = useAuth();

  // Only super admins can access this page
  if (user.role !== 'super-admin') {
    return (
      <DashboardLayout title="Access Denied" description="You don't have permission to view this page">
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="mb-2">Access Denied</h3>
          <p className="text-gray-600">Only Super Admins can manage user access.</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="User Access Management" description="Manage admin users and permissions">
      <div className="space-y-6">
        {/* Add Admin Button */}
        <div className="flex justify-end">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-[#2F3640] rounded-lg hover:bg-[#C4A030] transition-colors">
            <Plus className="w-4 h-4" />
            Add Admin
          </button>
        </div>

        {/* Admins Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3>Admin Users</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-3 text-gray-600">Name</th>
                  <th className="text-left px-6 py-3 text-gray-600">Email</th>
                  <th className="text-left px-6 py-3 text-gray-600">Role</th>
                  <th className="text-left px-6 py-3 text-gray-600">Hotel Branch</th>
                  <th className="text-left px-6 py-3 text-gray-600">Status</th>
                  <th className="text-left px-6 py-3 text-gray-600">Last Login</th>
                  <th className="text-center px-6 py-3 text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => {
                  const branch = admin.hotelBranchId
                    ? hotelBranches.find((b) => b.id === admin.hotelBranchId)
                    : null;

                  return (
                    <tr key={admin.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4">{admin.name}</td>
                      <td className="px-6 py-4 text-gray-600">{admin.email}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs ${
                            admin.role === 'super-admin'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {admin.role === 'super-admin' ? 'Super Admin' : 'Branch Admin'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {branch ? branch.name : admin.role === 'super-admin' ? 'All Hotels' : '-'}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs ${
                            admin.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {admin.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{admin.lastLogin}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Edit className="w-4 h-4 text-gray-600" />
                          </button>
                          {admin.id !== user.id && (
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Permissions Info */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="mb-4">Role Permissions</h3>
          <div className="space-y-4">
            <div>
              <h4 className="mb-2 text-purple-600">Super Admin</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                <li>Access to all hotel branches</li>
                <li>Manage all guests, rooms, and reservations across all hotels</li>
                <li>Create and manage admin users</li>
                <li>Configure system settings</li>
                <li>Full access to all features</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 text-blue-600">Branch Admin</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                <li>Access to assigned hotel branch only</li>
                <li>Manage guests, rooms, and reservations for their hotel</li>
                <li>View and update branch-specific settings</li>
                <li>Cannot create other admin users</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
