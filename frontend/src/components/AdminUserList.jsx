import React from 'react'
import AdminUserItem from './AdminUserItem'
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from '../slices/usersApiSlice';

const AdminUserList = () => {
  const { data: users, isLoading, error } = useGetAllUsersQuery();
  return isLoading ? (
    <p>loading</p>
  ) : (
    <div className="space-y-4 w-full pt-12 pl-16">
      <h1 className="text-xl font-bold text-gray-900">
        All Users
      </h1>
      <table className="table-auto w-full text-left border">
        <thead className="border">
          <tr>
            <th className="pl-1">Order #</th>
            <th>Name</th>
            <th className="col-span-2">Date</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border">
          {users?.map((user) => {
            return (
              <AdminUserItem key={user._id} user={user}/>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUserList