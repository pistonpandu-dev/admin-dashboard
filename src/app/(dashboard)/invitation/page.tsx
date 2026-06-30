'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Mail, Send, Check, X, Clock } from 'lucide-react'
import { useToast } from '@/lib/hooks/use-toast'

export default function InvitationPage() {
  const { toast } = useToast()
  const [email, setEmail] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [invitations, setInvitations] = useState([
    { id: 1, email: 'user1@example.com', status: 'sent', time: '2024-01-15 10:30' },
    { id: 2, email: 'user2@example.com', status: 'accepted', time: '2024-01-15 09:20' },
    { id: 3, email: 'user3@example.com', status: 'pending', time: '2024-01-14 16:45' },
  ])

  const handleSendInvite = () => {
    if (!email) return
    
    setInvitations([
      { id: Date.now(), email, status: 'pending', time: new Date().toLocaleString() },
      ...invitations
    ])
    
    toast({
      title: 'Invitation Sent',
      description: `Invitation sent to ${email}`,
    })
    
    setEmail('')
    setIsOpen(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'accepted':
        return <Badge variant="default" className="bg-green-500"><Check className="mr-1 h-3 w-3" />Accepted</Badge>
      case 'sent':
        return <Badge variant="outline"><Send className="mr-1 h-3 w-3" />Sent</Badge>
      case 'pending':
        return <Badge variant="secondary"><Clock className="mr-1 h-3 w-3" />Pending</Badge>
      default:
        return <Badge variant="destructive"><X className="mr-1 h-3 w-3" />Failed</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Invitations</h1>
          <p className="text-muted-foreground">Invite users to join your dashboard</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Mail className="mr-2 h-4 w-4" />
              Send Invitation
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send Invitation</DialogTitle>
              <DialogDescription>
                Invite a user to access the dashboard via email.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSendInvite} disabled={!email}>
                <Send className="mr-2 h-4 w-4" />
                Send Invitation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invitation History</CardTitle>
          <CardDescription>All sent invitations and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sent At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invitations.map((invite) => (
                <TableRow key={invite.id}>
                  <TableCell className="font-medium">{invite.email}</TableCell>
                  <TableCell>{getStatusBadge(invite.status)}</TableCell>
                  <TableCell>{invite.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
