import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Pencil, Plus, Trash } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

import { allUsers, addUser, editUser, deleteUser } from "@/api/api"

const AdminUsers = () => {
  const [users, setUsers] = useState<any[]>([])
  const [addOpen, setAddOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any | null>(null)
  const [formData, setFormData] = useState<any>({
    name: "",
    email: "",
    password: "",
    phone: "",
    street: "",
    city: "",
    zip: "",
  })

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await allUsers()
      setUsers(res.data)
    } catch (err) {
      console.error("Error fetching users:", err)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // Handle form input changes
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Add user
  const handleAddUser = async (e: any) => {
    e.preventDefault()
    try {
      await addUser(formData)
      fetchUsers()
      setAddOpen(false)
      setFormData({})
    } catch (err) {
      console.error("Error adding user:", err)
    }
  }

  // Edit user
  const handleEditUser = async (e: any) => {
    e.preventDefault()
    if (!selectedUser) return
    try {
      await editUser(formData, selectedUser.id)
      fetchUsers()
      setEditOpen(false)
      setSelectedUser(null)
    } catch (err) {
      console.error("Error editing user:", err)
    }
  }

  // Delete user
  const handleDeleteUser = async () => {
    if (!selectedUser) return
    try {
      await deleteUser(selectedUser.id)
      fetchUsers()
      setDeleteOpen(false)
      setSelectedUser(null)
    } catch (err) {
      console.error("Error deleting user:", err)
    }
  }

  return (
    <div className="p-4 flex justify-center items-center w-full flex-col gap-4">
      <div className="w-full flex flex-row">
        <div className="w-1/2 flex justify-start items-center">
          <h2 className="font-bold ">Users</h2>
        </div>
        <div className="w-1/2 flex justify-end items-center">
          <Button
            variant="outline"
            className="border-2 border-green-500 text-green-500"
            onClick={() => {
              setFormData({})
              setAddOpen(true)
            }}
          >
            <Plus className="h-8 w-8 mr-2" /> Add User
          </Button>
        </div>
      </div>

      {/* Table */}
      <Table className="w-full bg-gray-50 p-4 rounded-md">
        <TableHeader className="bg-gray-300">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Street</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Zip</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.street}</TableCell>
              <TableCell>{user.city}</TableCell>
              <TableCell>{user.zip}</TableCell>
              <TableCell className="flex flex-row gap-2 px-2 justify-end">
                <Button
                  className="border-2 border-blue-600 cursor-pointer"
                  variant="outline"
                  onClick={() => {
                    setSelectedUser(user)
                    setFormData(user)
                    setEditOpen(true)
                  }}
                >
                  <Pencil className="h-8 w-8 text-blue-600" />
                </Button>
                <Button
                  className="border-2 border-red-600 cursor-pointer"
                  variant="outline"
                  onClick={() => {
                    setSelectedUser(user)
                    setDeleteOpen(true)
                  }}
                >
                  <Trash className="h-8 w-8 text-red-600" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <form onSubmit={handleAddUser}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add User</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              {["name", "email", "password", "phone", "street", "city", "zip"].map((field) => (
                <div key={field} className="grid gap-3">
                  <Label htmlFor={field}>{field.toUpperCase()}</Label>
                  <Input
                    id={field}
                    name={field}
                    value={formData[field] || ""}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <form onSubmit={handleEditUser}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              {["name", "email", "password", "phone", "street", "city", "zip"].map((field) => (
                <div key={field} className="grid gap-3">
                  <Label htmlFor={field}>{field.toUpperCase()}</Label>
                  <Input
                    id={field}
                    name={field}
                    value={formData[field] || ""}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the user.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default AdminUsers
