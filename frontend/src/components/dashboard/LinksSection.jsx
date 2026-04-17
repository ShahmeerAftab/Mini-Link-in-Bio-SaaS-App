"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllLinks, createLink, updateLink, deleteLink } from "@/lib/api/links";

// ── Toggle ────────────────────────────────────────────────────────────────────

const Toggle = ({ isActive, onToggle }) => (
  <button
    onClick={onToggle}
    className={`relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0 ${
      isActive ? "bg-[#111111]" : "bg-black/10"
    }`}
  >
    <span
      className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-200 ${
        isActive ? "left-6" : "left-1"
      }`}
    />
  </button>
);

// ── Link Card ─────────────────────────────────────────────────────────────────

const LinkCard = ({ link, onToggle, onDelete }) => {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ title: link.title, url: link.url });

  const { mutate: saveLink, isPending } = useMutation({
    mutationFn: (data) => updateLink(link._id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["all-links"]);
      setEditing(false);
    },
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  if (editing) {
    return (
      <div className="bg-white border border-[#111111]/12 rounded-2xl p-5 flex flex-col gap-4 shadow-sm">
        <p className="text-xs font-bold text-black/35 uppercase tracking-widest">Editing Link</p>
        <form
          onSubmit={(e) => { e.preventDefault(); saveLink(form); }}
          className="flex flex-col gap-3"
        >
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Link title"
            required
            className="px-4 py-3 rounded-xl border border-black/8 text-sm outline-none focus:border-[#111111] bg-[#f9f9f7] text-[#111111] placeholder:text-black/25 transition-colors"
          />
          <input
            type="url"
            name="url"
            value={form.url}
            onChange={handleChange}
            placeholder="https://example.com"
            required
            className="px-4 py-3 rounded-xl border border-black/8 text-sm outline-none focus:border-[#111111] bg-[#f9f9f7] text-[#111111] placeholder:text-black/25 transition-colors"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isPending}
              className="bg-[#111111] text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-[#222222] transition-colors disabled:opacity-40"
            >
              {isPending ? "Saving…" : "Save"}
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="bg-black/5 text-[#111111] px-5 py-2 rounded-xl text-xs font-bold hover:bg-black/8 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className={`bg-white border rounded-2xl p-4 flex items-center gap-4 shadow-sm transition-all duration-200 hover:shadow-md group ${
      link.isActive ? "border-black/6" : "border-black/4 opacity-60"
    }`}>

      {/* Status dot */}
      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${link.isActive ? "bg-emerald-400" : "bg-black/15"}`} />

      {/* Link info */}
      <div className="flex-1 min-w-0">
        <p className="font-bold text-sm text-[#111111] truncate">{link.title}</p>
        <p className="text-xs text-black/35 truncate mt-0.5">{link.url}</p>
      </div>

      {/* Clicks badge */}
      <div className="hidden sm:flex items-center gap-1 bg-[#f5f5f3] border border-black/5 text-black/40 text-xs font-semibold px-3 py-1.5 rounded-lg flex-shrink-0">
        <span className="text-[10px]">↗</span>
        <span>{link.clicks}</span>
      </div>

      {/* Toggle */}
      <Toggle isActive={link.isActive} onToggle={onToggle} />

      {/* Action buttons */}
      <div className="flex gap-1.5 flex-shrink-0">
        <button
          onClick={() => setEditing(true)}
          className="w-8 h-8 flex items-center justify-center rounded-xl bg-black/4 hover:bg-black/8 text-black/50 text-xs transition-colors"
          title="Edit"
        >
          ✎
        </button>
        <button
          onClick={onDelete}
          className="w-8 h-8 flex items-center justify-center rounded-xl bg-red-50 hover:bg-red-100 text-red-400 text-xs transition-colors"
          title="Delete"
        >
          ✕
        </button>
      </div>

    </div>
  );
};

// ── Main Links Section ────────────────────────────────────────────────────────

const LinksSection = ({ profileId }) => {
  const queryClient = useQueryClient();
  const [newLink, setNewLink] = useState({ title: "", url: "" });

  const { data: links, isLoading } = useQuery({
    queryKey: ["all-links", profileId],
    queryFn: () => getAllLinks(profileId),
  });

  const { mutate: addLink, isPending: isAdding } = useMutation({
    mutationFn: (data) => createLink(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["all-links", profileId]);
      setNewLink({ title: "", url: "" });
    },
  });

  const { mutate: toggleLink } = useMutation({
    mutationFn: ({ id, isActive }) => updateLink(id, { isActive }),
    onSuccess: () => queryClient.invalidateQueries(["all-links", profileId]),
  });

  const { mutate: removeLink } = useMutation({
    mutationFn: (id) => deleteLink(id),
    onSuccess: () => queryClient.invalidateQueries(["all-links", profileId]),
  });

  const handleAddLink = (e) => {
    e.preventDefault();
    addLink({ ...newLink, profileId });
  };

  const handleDelete = (id) => {
    if (confirm("Delete this link?")) removeLink(id);
  };

  const activeCount = links?.filter((l) => l.isActive).length ?? 0;
  const totalClicks = links?.reduce((sum, l) => sum + (l.clicks || 0), 0) ?? 0;

  return (
    <div className="max-w-2xl flex flex-col gap-6">

      {/* ── Stats row ── */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Links",   value: links?.length ?? "—" },
          { label: "Active",        value: activeCount },
          { label: "Total Clicks",  value: totalClicks },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-black/6 rounded-2xl p-5 shadow-sm">
            <p className="text-2xl font-black text-[#111111]">{stat.value}</p>
            <p className="text-xs text-black/35 font-semibold mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* ── Add new link ── */}
      <div className="bg-white border border-black/6 rounded-2xl shadow-sm p-6">
        <p className="text-xs font-bold text-black/35 uppercase tracking-widest mb-4">Add New Link</p>
        <form onSubmit={handleAddLink} className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Title  (e.g. My Portfolio)"
              value={newLink.title}
              onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
              required
              className="flex-1 px-4 py-3 rounded-xl border border-black/8 text-sm outline-none focus:border-[#111111] bg-[#f9f9f7] text-[#111111] placeholder:text-black/25 transition-colors"
            />
            <input
              type="url"
              placeholder="URL  (https://…)"
              value={newLink.url}
              onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
              required
              className="flex-1 px-4 py-3 rounded-xl border border-black/8 text-sm outline-none focus:border-[#111111] bg-[#f9f9f7] text-[#111111] placeholder:text-black/25 transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={isAdding}
            className="self-start bg-[#111111] text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#222222] transition-colors disabled:opacity-40 flex items-center gap-2"
          >
            {isAdding ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Adding…
              </>
            ) : (
              <>+ Add Link</>
            )}
          </button>
        </form>
      </div>

      {/* ── Links list ── */}
      <div className="flex flex-col gap-3">

        {/* List header */}
        <div className="flex items-center justify-between px-1">
          <p className="text-xs font-bold text-black/35 uppercase tracking-widest">Your Links</p>
          {links?.length > 0 && (
            <p className="text-xs text-black/30">{links.length} total</p>
          )}
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex flex-col gap-3 animate-pulse">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-[68px] rounded-2xl bg-black/4" />
            ))}
          </div>
        )}

        {/* Empty */}
        {!isLoading && links?.length === 0 && (
          <div className="bg-white border border-black/6 rounded-2xl p-10 text-center">
            <p className="text-3xl mb-3">⛓</p>
            <p className="text-sm font-semibold text-[#111111]">No links yet</p>
            <p className="text-xs text-black/35 mt-1">Add your first link using the form above.</p>
          </div>
        )}

        {/* Cards */}
        {!isLoading && links?.length > 0 && links.map((link) => (
          <LinkCard
            key={link._id}
            link={link}
            onToggle={() => toggleLink({ id: link._id, isActive: !link.isActive })}
            onDelete={() => handleDelete(link._id)}
          />
        ))}

      </div>
    </div>
  );
};

export default LinksSection;
