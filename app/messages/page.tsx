"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Send, Inbox, Mail, Search, User } from "lucide-react"

// ── Types & data ──────────────────────────────────────────────────────────────

interface Message {
  id: string
  sender_name: string
  sender_id?: string
  recipient_id: string
  content: string
  sent_at: string
  read: boolean
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    sender_name: "Sarah Chen",
    recipient_id: "user_1",
    content: "Hi! I saw your profile and think you would be a great fit.",
    sent_at: new Date().toISOString(),
    read: false,
  },
]

const CURRENT_USER = "user_1"

/**
 * MessagesPage — inbox and compose interface for recruiter/advisor communication.
 *
 * All state is local (no backend). Unread counts, search filtering, and
 * mark-as-read are all handled client-side.
 */
export default function MessagesPage() {
  const [messages, setMessages]         = useState<Message[]>(INITIAL_MESSAGES)
  const [selectedMessage, setSelected]  = useState<Message | null>(null)
  const [newMessage, setNewMessage]     = useState({ subject: "", message: "" })
  const [showCompose, setShowCompose]   = useState(false)
  const [searchQuery, setSearchQuery]   = useState("")

  const markAsRead = (id: string) =>
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)))

  const sendMessage = () => {
    if (!newMessage.message) return
    const msg: Message = {
      id:           Date.now().toString(),
      sender_name:  "Demo User",
      sender_id:    CURRENT_USER,
      recipient_id: "recruiter_1",
      content:      newMessage.message,
      sent_at:      new Date().toISOString(),
      read:         true,
    }
    setMessages((prev) => [msg, ...prev])
    setNewMessage({ subject: "", message: "" })
    setShowCompose(false)
  }

  const filteredMessages = messages.filter((m) => {
    const q = searchQuery.toLowerCase()
    return m.sender_name?.toLowerCase().includes(q) || m.content?.toLowerCase().includes(q)
  })

  const unreadCount = messages.filter((m) => !m.read && m.recipient_id === CURRENT_USER).length

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <Navigation />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl mx-auto w-full">
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-900 mb-2">Messages</h1>
            <p className="text-sm sm:text-base text-primary-700">
              {unreadCount > 0 && (
                <Badge variant="secondary" className="bg-primary-500 text-white mr-2">{unreadCount} unread</Badge>
              )}
              Communicate with recruiters and career support
            </p>
          </div>
          <Button onClick={() => setShowCompose(!showCompose)} className="bg-primary-500 hover:bg-primary-600 text-white w-full sm:w-auto">
            <Send className="w-4 h-4 mr-2" /> Compose
          </Button>
        </div>

        {/* ── Compose ── */}
        {showCompose && (
          <Card className="mb-6 border-primary-200">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">New Message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-primary-900 mb-1.5 block">Subject</label>
                <Input placeholder="Message subject" value={newMessage.subject}
                  onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium text-primary-900 mb-1.5 block">Message</label>
                <Textarea placeholder="Type your message here..." value={newMessage.message} rows={5}
                  onChange={(e) => setNewMessage({ ...newMessage, message: e.target.value })} className="resize-none" />
              </div>
              <div className="flex gap-3">
                <Button onClick={sendMessage} className="flex-1 bg-primary-500 hover:bg-primary-600 text-white">
                  <Send className="w-4 h-4 mr-2" /> Send Message
                </Button>
                <Button onClick={() => setShowCompose(false)} variant="outline" className="flex-1 border-primary-300 text-primary-700 hover:bg-primary-50">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ── Search ── */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-400 w-5 h-5" />
          <Input placeholder="Search messages..." value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 h-11 text-sm sm:text-base" />
        </div>

        {/* ── Inbox + detail ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Message list */}
          <div className="space-y-3">
            {filteredMessages.length === 0 ? (
              <Card className="p-8 sm:p-12 text-center border-primary-100">
                <Inbox className="w-16 h-16 mx-auto text-primary-300 mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-primary-900 mb-2">No messages yet</h3>
                <p className="text-sm sm:text-base text-primary-600 mb-4">Start a conversation with recruiters or career advisors</p>
                <Button onClick={() => setShowCompose(true)} className="bg-primary-500 hover:bg-primary-600 text-white">
                  <Send className="w-4 h-4 mr-2" /> Send First Message
                </Button>
              </Card>
            ) : (
              filteredMessages.map((msg) => {
                const isUnread = !msg.read && msg.recipient_id === CURRENT_USER
                return (
                  <Card
                    key={msg.id}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-md ${
                      selectedMessage?.id === msg.id ? "border-primary-500 bg-primary-50/50"
                      : isUnread ? "border-primary-300 bg-primary-50/30" : "border-primary-100"
                    }`}
                    onClick={() => { setSelected(msg); if (isUnread) markAsRead(msg.id) }}
                  >
                    <CardHeader className="pb-3 px-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            {isUnread && <Badge variant="secondary" className="bg-primary-500 text-white text-xs px-2 py-0.5">New</Badge>}
                            <CardTitle className="text-sm sm:text-base text-primary-900 truncate">{msg.sender_name}</CardTitle>
                          </div>
                          <CardDescription className="text-xs sm:text-sm">
                            {msg.sender_id === CURRENT_USER ? "Sent" : "Received"} • {new Date(msg.sent_at).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <Mail className={`w-5 h-5 shrink-0 ${msg.read ? "text-primary-300" : "text-primary-500"}`} />
                      </div>
                    </CardHeader>
                    <CardContent className="px-4">
                      <p className="text-xs sm:text-sm text-primary-700 line-clamp-2">{msg.content}</p>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>

          {/* Message detail */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            {selectedMessage ? (
              <Card className="border-primary-200">
                <CardHeader className="border-b border-primary-100">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-primary-100">
                      <User className="w-5 h-5 text-primary-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg sm:text-xl text-primary-900 mb-1 break-words">{selectedMessage.sender_name}</CardTitle>
                      <CardDescription className="text-xs sm:text-sm">
                        {selectedMessage.sender_id === CURRENT_USER ? "You sent this message" : "Message received"} • {new Date(selectedMessage.sent_at).toLocaleString()}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-sm sm:text-base text-primary-700 whitespace-pre-wrap leading-relaxed">{selectedMessage.content}</p>
                </CardContent>
              </Card>
            ) : (
              <Card className="p-8 sm:p-12 text-center border-primary-100 hidden lg:block">
                <MessageSquare className="w-16 h-16 mx-auto text-primary-300 mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-primary-900 mb-2">Select a message</h3>
                <p className="text-sm sm:text-base text-primary-600">Choose a message from the list to view</p>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
