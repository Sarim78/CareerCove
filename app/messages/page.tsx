"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Send, Inbox, Mail, Search, User } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export default function MessagesPage() {
  const [messages, setMessages] = useState<any[]>([])
  const [selectedMessage, setSelectedMessage] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [newMessage, setNewMessage] = useState({ subject: "", message: "" })
  const [showCompose, setShowCompose] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const supabase = createClient()

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    setUser(session?.user ?? null)

    if (session?.user) {
      loadMessages(session.user.id)
    } else {
      setLoading(false)
    }
  }

  const loadMessages = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
        .order("sent_at", { ascending: false })

      if (error) throw error
      setMessages(data || [])
    } catch (error) {
      // Error handled silently
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (messageId: string) => {
    if (!user) return

    try {
      await supabase
        .from("messages")
        .update({ is_read: true, read_at: new Date().toISOString() })
        .eq("id", messageId)
        .eq("receiver_id", user.id)

      setMessages((prev) =>
        prev.map((msg) => (msg.id === messageId ? { ...msg, is_read: true, read_at: new Date().toISOString() } : msg)),
      )
    } catch (error) {
      // Error handled silently
    }
  }

  const sendMessage = async () => {
    if (!user || !newMessage.subject || !newMessage.message) return

    try {
      const { error } = await supabase.from("messages").insert({
        sender_id: user.id,
        receiver_id: user.id,
        subject: newMessage.subject,
        message: newMessage.message,
      })

      if (error) throw error

      setNewMessage({ subject: "", message: "" })
      setShowCompose(false)
      loadMessages(user.id)
    } catch (error) {
      // Error handled silently
    }
  }

  const filteredMessages = messages.filter(
    (msg) =>
      msg.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.message?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const unreadCount = messages.filter((msg) => !msg.is_read && msg.receiver_id === user?.id).length

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            <p className="mt-4 text-primary-600">Loading messages...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <Navigation />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-900 mb-2">Messages</h1>
            <p className="text-sm sm:text-base text-primary-700">
              {unreadCount > 0 && (
                <Badge variant="secondary" className="bg-primary-500 text-white mr-2">
                  {unreadCount} unread
                </Badge>
              )}
              Communicate with recruiters and career support
            </p>
          </div>
          {user && (
            <Button
              onClick={() => setShowCompose(!showCompose)}
              className="bg-primary-500 hover:bg-primary-600 text-white w-full sm:w-auto"
            >
              <Send className="w-4 h-4 mr-2" />
              Compose
            </Button>
          )}
        </div>

        {!user ? (
          <Card className="p-8 sm:p-12 text-center border-primary-100">
            <MessageSquare className="w-16 h-16 mx-auto text-primary-300 mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-primary-900 mb-2">Sign in to access messages</h3>
            <p className="text-sm sm:text-base text-primary-600 mb-4">
              Create an account to communicate with recruiters and career advisors
            </p>
            <Button
              onClick={() => (window.location.href = "/auth")}
              className="bg-primary-500 hover:bg-primary-600 text-white"
            >
              Sign In / Sign Up
            </Button>
          </Card>
        ) : (
          <>
            {/* Compose Message */}
            {showCompose && (
              <Card className="mb-6 border-primary-200">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">New Message</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-primary-900 mb-1.5 block">Subject</label>
                    <Input
                      placeholder="Message subject"
                      value={newMessage.subject}
                      onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                      className="text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-primary-900 mb-1.5 block">Message</label>
                    <Textarea
                      placeholder="Type your message here..."
                      value={newMessage.message}
                      onChange={(e) => setNewMessage({ ...newMessage, message: e.target.value })}
                      rows={5}
                      className="text-sm sm:text-base resize-none"
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={sendMessage} className="flex-1 bg-primary-500 hover:bg-primary-600 text-white">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                    <Button
                      onClick={() => setShowCompose(false)}
                      variant="outline"
                      className="flex-1 border-primary-300 text-primary-700 hover:bg-primary-50"
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400 w-5 h-5" />
              <Input
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 text-sm sm:text-base"
              />
            </div>

            {/* Messages Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              {/* Messages List */}
              <div className="space-y-3">
                {filteredMessages.length === 0 ? (
                  <Card className="p-8 sm:p-12 text-center border-primary-100">
                    <Inbox className="w-16 h-16 mx-auto text-primary-300 mb-4" />
                    <h3 className="text-lg sm:text-xl font-semibold text-primary-900 mb-2">No messages yet</h3>
                    <p className="text-sm sm:text-base text-primary-600 mb-4">
                      Start a conversation with recruiters or career advisors
                    </p>
                    <Button
                      onClick={() => setShowCompose(true)}
                      className="bg-primary-500 hover:bg-primary-600 text-white"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send First Message
                    </Button>
                  </Card>
                ) : (
                  filteredMessages.map((message) => (
                    <Card
                      key={message.id}
                      className={`cursor-pointer transition-all duration-300 hover:shadow-md ${
                        selectedMessage?.id === message.id
                          ? "border-primary-500 bg-primary-50/50"
                          : message.is_read
                            ? "border-primary-100"
                            : "border-primary-300 bg-primary-50/30"
                      }`}
                      onClick={() => {
                        setSelectedMessage(message)
                        if (!message.is_read && message.receiver_id === user?.id) {
                          markAsRead(message.id)
                        }
                      }}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              {!message.is_read && message.receiver_id === user?.id && (
                                <Badge variant="secondary" className="bg-primary-500 text-white text-xs px-2 py-0.5">
                                  New
                                </Badge>
                              )}
                              <CardTitle className="text-sm sm:text-base text-primary-900 truncate">
                                {message.subject}
                              </CardTitle>
                            </div>
                            <CardDescription className="text-xs sm:text-sm">
                              {message.sender_id === user?.id ? "Sent" : "Received"} •{" "}
                              {new Date(message.sent_at).toLocaleDateString()}
                            </CardDescription>
                          </div>
                          <Mail
                            className={`w-5 h-5 shrink-0 ${message.is_read ? "text-primary-300" : "text-primary-500"}`}
                          />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs sm:text-sm text-primary-700 line-clamp-2">{message.message}</p>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>

              {/* Message Detail */}
              <div className="lg:sticky lg:top-24 lg:h-fit">
                {selectedMessage ? (
                  <Card className="border-primary-200">
                    <CardHeader className="border-b border-primary-100">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-full bg-primary-100">
                          <User className="w-5 h-5 text-primary-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg sm:text-xl text-primary-900 mb-1 break-words">
                            {selectedMessage.subject}
                          </CardTitle>
                          <CardDescription className="text-xs sm:text-sm">
                            {selectedMessage.sender_id === user?.id ? "You sent this message" : "Message received"} •{" "}
                            {new Date(selectedMessage.sent_at).toLocaleString()}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <p className="text-sm sm:text-base text-primary-700 whitespace-pre-wrap leading-relaxed">
                        {selectedMessage.message}
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="p-8 sm:p-12 text-center border-primary-100 hidden lg:block">
                    <MessageSquare className="w-16 h-16 mx-auto text-primary-300 mb-4" />
                    <h3 className="text-lg sm:text-xl font-semibold text-primary-900 mb-2">Select a message</h3>
                    <p className="text-sm sm:text-base text-primary-600">
                      Choose a message from the list to view its content
                    </p>
                  </Card>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
