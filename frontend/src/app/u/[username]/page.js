"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/lib/api/profile";
import { getLinks } from "@/lib/api/links";
import { getTemplate } from "@/lib/templates";
import ProfileHeader from "@/components/profile/ProfileHeader";
import LinkList from "@/components/profile/LinkList";

const Page = ({ params }) => {
  const { username } = use(params);

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["profile", username],
    queryFn: () => getProfile(username),
  });

  const profileId = profile?._id;

  const { data: links, isLoading: linksLoading } = useQuery({
    queryKey: ["links", profileId],
    queryFn: () => getLinks(profileId),
    enabled: !!profileId,
  });

  // Resolve template — fall back to template 1 while loading
  const template = getTemplate(profile?.template ?? 1);

  return (
    <main className="min-h-screen flex flex-col md:flex-row">

      {/* ── Left Panel — Profile Info ── */}
      <div
        className="md:w-[38%] md:min-h-screen md:sticky md:top-0"
        style={{ backgroundColor: profileLoading ? "#111111" : template.panelBg }}
      >
        <ProfileHeader profile={profile} isLoading={profileLoading} template={template} />
      </div>

      {/* ── Right Panel — Links ── */}
      <div className="md:w-[62%] bg-[#fafaf8] min-h-screen">
        <LinkList links={links} isLoading={linksLoading} template={template} />
      </div>

    </main>
  );
};

export default Page;
