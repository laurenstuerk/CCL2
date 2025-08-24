import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUsers, updateUser, deleteUser } from "../../services/adminApi";
import { Helmet } from "react-helmet-async";
import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog";

// UI & Icon Imports
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { MoreHorizontal, Edit, Trash2, User, Mail, Shield, Calendar, Search, ArrowUp, ArrowDown, Plus } from "lucide-react";

// Hook für Debouncing (verhindert API-Aufrufe bei jeder Tasten-Eingabe)
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

// Sub-Komponente für sortierbare Spaltenköpfe zur besseren Lesbarkeit
const SortableHeader = ({ columnId, label, icon: Icon, sorting, onSort }) => (
  <Button variant="ghost" onClick={() => onSort(columnId)} className="pl-0 hover:bg-transparent">
    <Icon className="mr-2 h-4 w-4" />
    {label}
    {sorting.sortBy === columnId && (sorting.order === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />)}
  </Button>
);

function EditUserModal({ user, isOpen, onOpenChange, onSave, isPending }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // Populate form when a user is selected
    if (user) {
      setFormData({
        name: user.name || "",
        surname: user.surname || "",
        username: user.username || "",
        email: user.email || "",
        role: user.role || "user",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    onSave(user.id, formData);
  };

  if (!user) return null;
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-neutral-900 border-neutral-800 text-white">
        <DialogHeader>
          <DialogTitle>Edit User: @{user.username}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} className="col-span-3 bg-neutral-800 border-neutral-700" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="surname" className="text-right">
              Surname
            </Label>
            <Input id="surname" name="surname" value={formData.surname} onChange={handleChange} className="col-span-3 bg-neutral-800 border-neutral-700" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              E-mail
            </Label>
            <Input id="email" name="email" value={formData.email} onChange={handleChange} className="col-span-3 bg-neutral-800 border-neutral-700" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Role
            </Label>
            <Input id="role" name="role" value={formData.role} onChange={handleChange} className="col-span-3 bg-neutral-800 border-neutral-700" />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function AdminDashboard() {
  const queryClient = useQueryClient();

  // State for queries, modals, and forms
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sorting, setSorting] = useState({ sortBy: "id", order: "desc" });
  const [searchTerm, setSearchTerm] = useState("");

  // State for managing the modals
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["adminUsers", { page, limit, sorting, search: debouncedSearchTerm }],
    queryFn: () => fetchUsers({ page, limit, ...sorting, search: debouncedSearchTerm }),
    keepPreviousData: true,
  });

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success("User updated successfully.");
      queryClient.invalidateQueries(["adminUsers"]);
      setIsEditModalOpen(false);
    },
    onError: (err) => toast.error(err.response?.data?.message || "Failed to update user."),
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success("User deleted successfully.");
      setIsDeleteDialogOpen(false); // Close the dialog
      // This is the key fix: invalidate the query to force a refetch
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
    },
    onError: (err) => toast.error(err.response?.data?.message || "Failed to delete user."),
  });
  const handleSort = (columnId) => {
    setPage(1); // Bei neuer Sortierung immer zur ersten Seite springen
    setSorting((current) => ({
      sortBy: columnId,
      order: current.sortBy === columnId && current.order === "asc" ? "desc" : "asc",
    }));
  };

  const handleEditClick = (user) => {
    setSelectedUser(user); // Use the unified state setter
    setIsEditModalOpen(true);
  };
  const handleDeleteClick = (user) => {
    setSelectedUser(user); // Set the user to be deleted
    setIsDeleteDialogOpen(true); // Open the dialog
  };

  const handleSaveChanges = (userId, userData) => {
    updateUserMutation.mutate({ userId, userData });
  };

  const handleConfirmDelete = () => {
    if (selectedUser) {
      deleteUserMutation.mutate(selectedUser);
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 mt-16 p-4 md:p-6 max-w-7xl mx-auto">
      <Helmet>
        <title>Admin Dashboard - User Management</title>
        <meta name="description" content="Manage users, view statistics, and perform administrative tasks." />
      </Helmet>
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold">User Management</h1>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search by name, email, or username..."
            className="w-full md:w-80 bg-neutral-950 border-gray-700 pl-10 text-gray-100 placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => {
              setPage(1); // Bei neuer Suche zur ersten Seite springen
              setSearchTerm(e.target.value);
            }}
          />
        </div>
        <Button onClick={() => window.print()} variant="outline" className="w-full md:w-auto">
          Export
        </Button>
      </div>

      <Card className="bg-black border-gray-800">
        <div id="printable-table-area">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800 hover:bg-transparent">
                <TableHead>
                  <SortableHeader columnId="name" label="Full name" icon={User} sorting={sorting} onSort={handleSort} />
                </TableHead>
                <TableHead>
                  <SortableHeader columnId="username" label="Username" icon={User} sorting={sorting} onSort={handleSort} />
                </TableHead>
                <TableHead>
                  <SortableHeader columnId="email" label="Email" icon={Mail} sorting={sorting} onSort={handleSort} />
                </TableHead>
                <TableHead>
                  <SortableHeader columnId="role" label="Role" icon={Shield} sorting={sorting} onSort={handleSort} />
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <SortableHeader columnId="joinedDate" label="Joined" icon={Calendar} sorting={sorting} onSort={handleSort} />
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: limit }).map((_, index) => (
                  <TableRow key={index} className="border-gray-800">
                    <TableCell colSpan={6}>
                      <Skeleton className="h-8 w-full" />
                    </TableCell>
                  </TableRow>
                ))
              ) : isError ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-red-500 py-10">
                    Error: {error.message}
                  </TableCell>
                </TableRow>
              ) : (
                data?.data?.map((user) => (
                  <TableRow key={user.id} className="border-gray-800 hover:bg-neutral-900/75 transition-colors">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.profilePicture || ""} />
                          <AvatarFallback>{user.name?.[0]}</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">
                          {user.name} {user.surname}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-neutral-300">@{user.username}</TableCell>
                    <TableCell className="text-neutral-300">{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.role}</Badge>
                    </TableCell>
                    <TableCell>
                      {user.isActive ? (
                        <Badge className="bg-green-600/20 text-green-400 border border-green-600/30">Active</Badge>
                      ) : (
                        <Badge variant="outline" className="text-neutral-500 border-neutral-700">
                          Offline
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-neutral-300">{new Date(user.joinedDate).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-neutral-900 border-neutral-700 text-white">
                          <DropdownMenuItem onSelect={() => handleEditClick(user)}>
                            <Edit className="mr-2 h-4 w-4" /> Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => handleDeleteClick(user.id)} className="text-red-500 focus:text-red-500 focus:bg-red-900/50">
                            <Trash2 className="mr-2 h-4 w-4" /> Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <div className="flex items-center justify-between pt-4">
        <div className="text-sm text-neutral-400">Total Users: {data?.pagination?.totalRows || 0}</div>
        {data?.pagination && (
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => setPage(1)} disabled={isLoading || page === 1}>
              First
            </Button>
            <Button variant="outline" size="sm" onClick={() => setPage((p) => p - 1)} disabled={isLoading || page === 1}>
              Previous
            </Button>
            <span className="text-sm text-neutral-400">
              Page {page} of {data.pagination.totalPages || 1}
            </span>
            <Button variant="outline" size="sm" onClick={() => setPage((p) => p + 1)} disabled={isLoading || page === data.pagination.totalPages}>
              Next
            </Button>
            <Button variant="outline" size="sm" onClick={() => setPage(data.pagination.totalPages)} disabled={isLoading || page === data.pagination.totalPages}>
              Last
            </Button>
          </div>
        )}
      </div>

      <EditUserModal user={selectedUser} isOpen={isEditModalOpen} onOpenChange={setIsEditModalOpen} onSave={handleSaveChanges} isPending={updateUserMutation.isPending} />
      <DeleteConfirmationDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen} onConfirm={handleConfirmDelete} isPending={deleteUserMutation.isPending} itemType={`user ${selectedUser}`} />
    </div>
  );
}
