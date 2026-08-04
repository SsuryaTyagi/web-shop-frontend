// src/features/admin/pages/ContactMessages.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { markMessageReadThunk, deleteMessageThunk } from "../admin.Slice";
import {
  MessageSquare,
  Search,
  Mail,
  Phone,
  Clock,
  Trash2,
  Send,
  CheckCircle2,
  Inbox,
  Sparkles,
} from "lucide-react";

export default function ContactMessages() {
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.admin);

  const [selectedMessageId, setSelectedMessageId] = useState(
    messages[0]?.id || null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replySuccess, setReplySuccess] = useState(false);

  const selectedMessage = messages.find((m) => m.id === selectedMessageId);

  const filteredMessages = messages.filter((msg) => {
    if (searchQuery.trim() === "") return true;
    const q = searchQuery.toLowerCase();
    return (
      msg.senderName.toLowerCase().includes(q) ||
      msg.email.toLowerCase().includes(q) ||
      msg.subject.toLowerCase().includes(q)
    );
  });

  const handleSelectMessage = (msgId) => {
    setSelectedMessageId(msgId);
    dispatch(markMessageReadThunk(msgId));
    setReplySuccess(false);
  };

  const handleDeleteMessage = (msgId) => {
    if (window.confirm("Delete this message?")) {
      dispatch(deleteMessageThunk(msgId));
      if (selectedMessageId === msgId) {
        const remaining = messages.filter((m) => m.id !== msgId);
        setSelectedMessageId(remaining[0]?.id || null);
      }
    }
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setReplySuccess(true);
    setReplyText("");
    setTimeout(() => setReplySuccess(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Contact Messages & Support Inbox
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Customer feedback, catering inquiries, bulk orders, and support tickets.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 bg-[#E33B32]/10 text-[#E33B32] text-xs font-bold rounded-xl flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            <span>{messages.filter((m) => !m.isRead).length} Unread Messages</span>
          </span>
        </div>
      </div>

      {/* Main Inbox Container (Split View) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Messages Inbox List (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden flex flex-col h-[650px]">
          {/* Inbox Search Bar */}
          <div className="p-4 border-b border-slate-100">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search messages by sender or subject..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E33B32]/20 focus:border-[#E33B32]"
              />
            </div>
          </div>

          {/* Inbox Items Scrollable Container */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filteredMessages.length === 0 ? (
              <div className="p-12 text-center text-slate-400">
                <Inbox className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-xs">No customer messages found.</p>
              </div>
            ) : (
              filteredMessages.map((msg) => {
                const isSelected = msg.id === selectedMessageId;

                return (
                  <div
                    key={msg.id}
                    onClick={() => handleSelectMessage(msg.id)}
                    className={`p-4 cursor-pointer transition-all ${
                      isSelected
                        ? "bg-slate-100/90 border-l-4 border-[#E33B32]"
                        : "hover:bg-slate-50/80"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2 min-w-0">
                        {!msg.isRead && (
                          <span className="w-2.5 h-2.5 rounded-full bg-[#E33B32] flex-shrink-0 animate-pulse" />
                        )}
                        <h4
                          className={`text-xs font-bold truncate ${
                            !msg.isRead ? "text-slate-900 font-extrabold" : "text-slate-700"
                          }`}
                        >
                          {msg.senderName}
                        </h4>
                      </div>
                      <span className="text-[10px] font-semibold text-slate-400 flex-shrink-0">
                        {msg.timestamp}
                      </span>
                    </div>

                    <p
                      className={`text-xs truncate ${
                        !msg.isRead ? "font-bold text-slate-900" : "font-medium text-slate-600"
                      }`}
                    >
                      {msg.subject}
                    </p>

                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-1 font-normal">
                      {msg.message}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: Message Detail Panel & Reply Form (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-100 shadow-xs p-6 h-[650px] flex flex-col justify-between overflow-y-auto">
          {selectedMessage ? (
            <div className="space-y-6 flex-1 flex flex-col justify-between">
              {/* Message Header */}
              <div>
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 leading-snug">
                      {selectedMessage.subject}
                    </h3>
                    <div className="flex items-center gap-3 mt-2 text-xs">
                      <span className="font-bold text-slate-800">
                        {selectedMessage.senderName}
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-500 font-medium flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        {selectedMessage.email}
                      </span>
                      {selectedMessage.phone && (
                        <>
                          <span className="text-slate-400">•</span>
                          <span className="text-slate-500 font-medium flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5 text-slate-400" />
                            {selectedMessage.phone}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteMessage(selectedMessage.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Delete message"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Message Body Content */}
                <div className="mt-6 bg-slate-50 p-5 rounded-2xl border border-slate-200/80 text-sm font-normal text-slate-800 leading-relaxed whitespace-pre-line">
                  {selectedMessage.message}
                </div>
              </div>

              {/* Reply Form Section */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Send className="w-4 h-4 text-[#E33B32]" />
                  <span>Send Response Email</span>
                </h4>

                {replySuccess && (
                  <div className="mb-3 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Response successfully dispatched to {selectedMessage.email}!</span>
                  </div>
                )}

                <form onSubmit={handleSendReply} className="space-y-3">
                  <textarea
                    rows={3}
                    required
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={`Write a polite response to ${selectedMessage.senderName}...`}
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#E33B32]/30 focus:border-[#E33B32]"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-[#E33B32] hover:bg-[#c83129] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Dispatch Reply</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-slate-400">
              <MessageSquare className="w-12 h-12 mb-3 text-slate-300" />
              <p className="text-sm font-bold">No message selected</p>
              <p className="text-xs text-slate-400 mt-1">Select a message from the left inbox.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
