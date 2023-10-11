import React from "react";
import AdminUserItem from "./AdminUserItem";
import { useGetAllUsersQuery } from "../slices/usersApiSlice";

const AdminUserList = () => {
  const { data: users, isLoading, error, refetch } = useGetAllUsersQuery();
  return isLoading ? (
    <p>loading</p>
  ) : (
    <div className="space-y-4 w-full pt-12 pl-16">
      <h1 className="text-xl font-bold">All Users</h1>
      <table className="table-auto w-full text-left border">
        <thead className="border">
          <tr>
            <th className="pl-1">Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Admin</th>
          </tr>
        </thead>
        <tbody className="border">
          {users?.map((user) => {
            return (
              <AdminUserItem key={user._id} user={user} refetch={refetch} />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserList;
