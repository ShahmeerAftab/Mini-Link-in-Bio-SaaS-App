import LinkCard from "@/components/profile/LinkCard";

const LinkList = ({ links, isLoading, template }) => {

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 p-10 md:p-16 animate-pulse">
        <div className="h-4 w-20 rounded-full bg-black/8 mb-4" />
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-16 rounded-2xl bg-black/6" />
        ))}
      </div>
    );
  }

  const activeLinks = links?.filter((link) => link.isActive) || [];

  return (
    <div className="flex flex-col gap-4 p-10 md:p-16 min-h-screen">

      <p className="text-xs font-bold uppercase tracking-widest text-black/30 mb-2">
        Links
      </p>

      {activeLinks.length === 0 && (
        <p className="text-sm text-black/30 mt-4">No links added yet.</p>
      )}

      {activeLinks.map((link) => (
        <LinkCard key={link._id} link={link} template={template} />
      ))}

    </div>
  );
};

export default LinkList;
