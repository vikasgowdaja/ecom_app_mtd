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
import { ShoppingBag } from "lucide-react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { allOrders } from "@/api/api" // your backend already returns userName & address

const AdminOrders = () => {
  const [orders, setOrders] = useState<any[]>([])
  const [editOpen, setEditOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null)
  const [newStatus, setNewStatus] = useState<string>("")

  // Fetch orders (already contains userName & address)
  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const res = await allOrders()
      setOrders(res.data) // userName & address already included
    } catch (err) {
      console.error("Error fetching orders:", err)
    }
  }

  const handleOpenDialog = (order: any) => {
    setSelectedOrder(order)
    setNewStatus(order.status)
    setEditOpen(true)
  }

  const handleSaveChanges = async () => {
    if (!selectedOrder) return

    try {
      await fetch(`${process.env.REACT_APP_API_URL}/orders/update/${selectedOrder.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
      fetchOrders()
      setEditOpen(false)
    } catch (err) {
      console.error("Error updating order:", err)
    }
  }

  return (
    <div className="p-4 flex justify-center items-center w-full flex-col gap-4">
      <div className="w-full flex flex-row">
        <div className="w-1/2 flex justify-start items-center">
          <h2 className="font-bold">Orders</h2>
        </div>
      </div>

      <Table className="w-full bg-gray-50 p-4 rounded-md">
        <TableHeader className="bg-gray-300">
          <TableRow>
            <TableHead>User Name</TableHead>
            <TableHead>Item Summary</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Order Status</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Address</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order: any) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.userName}</TableCell>
              <TableCell>
                {order.items?.map((i: any) => i.productId).join(", ")}
              </TableCell>
              <TableCell>{order.totalAmount}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>{order.createdAt || "N/A"}</TableCell>
              <TableCell>{order.address}</TableCell>
              <TableCell className="text-right">
                <Button
                  className="border-2 border-cyan-600 cursor-pointer"
                  variant="outline"
                  onClick={() => handleOpenDialog(order)}
                >
                  <ShoppingBag className="h-8 w-8 text-cyan-600" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSaveChanges()
          }}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Update Status</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Order Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Order Status</SelectLabel>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div className="grid gap-3">
                <p>Address </p>
                <p className="font-semibold">{selectedOrder?.address}</p>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  onClick={() => setEditOpen(false)}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  )
}

export default AdminOrders
