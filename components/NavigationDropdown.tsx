'use client';

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, ChevronDown } from "lucide-react";

export type DropdownLink = {
  label: string;
  description?: string;
  url?: string;
  onClick?: () => void;
};

export type NavigationDropdownProps = {
  title: string;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  links?: DropdownLink[];
  embedUrl?: string;
  externalUrl?: string;
  onLinkClick?: (link: DropdownLink) => void;
};

/**
 * NavigationDropdown Component
 * 
 * Two modes:
 * 1. With embedUrl: Opens an iframe of the website in a modal (keeps users in-app)
 * 2. With links: Displays dropdown navigation options
 * 
 * Perfect for iPad kiosks where we want to prevent users from leaving.
 */
export const NavigationDropdown: React.FC<NavigationDropdownProps> = ({
  title,
  description,
  icon: Icon,
  links,
  embedUrl,
  externalUrl,
  onLinkClick,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleLinkClick = (link: DropdownLink) => {
    onLinkClick?.(link);
    
    if (link.url) {
      // Open external links in a new tab/window
      window.open(link.url, "_blank", "noopener,noreferrer");
    } else if (link.onClick) {
      link.onClick();
    }
  };

  // If it's an external URL (can't be embedded), open it directly
  if (externalUrl) {
    return (
      <button
        onClick={() => window.open(externalUrl, "_blank", "noopener,noreferrer")}
        className="w-full"
      >
        <Card className="hover:shadow-xl transition-shadow cursor-pointer rounded-2xl h-full">
          <CardContent className="p-5 flex gap-4 items-start">
            <div className="p-3 rounded-2xl bg-muted shrink-0">
              <Icon className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold leading-tight">{title}</h3>
              {description && (
                <div className="text-sm text-muted-foreground">{description}</div>
              )}
            </div>
            <ChevronDown className="w-5 h-5 ml-auto mt-1 text-muted-foreground" />
          </CardContent>
        </Card>
      </button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Card className="hover:shadow-xl transition-shadow cursor-pointer rounded-2xl h-full">
          <CardContent className="p-5 flex gap-4 items-start">
            <div className="p-3 rounded-2xl bg-muted shrink-0">
              <Icon className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold leading-tight">{title}</h3>
              {description && (
                <div className="text-sm text-muted-foreground">{description}</div>
              )}
            </div>
            <ChevronDown className="w-5 h-5 ml-auto mt-1 text-muted-foreground" />
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className={embedUrl ? "sm:max-w-4xl sm:max-h-[85vh] flex flex-col" : "sm:max-w-md"}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon className="w-5 h-5" />
            {title}
          </DialogTitle>
          {description && !embedUrl && (
            <DialogDescription>{description}</DialogDescription>
          )}
        </DialogHeader>

        {embedUrl ? (
          // Embedded website view
          <div className="flex-1 w-full min-h-0 border border-slate-200 rounded-lg overflow-hidden">
            <iframe
              src={embedUrl}
              title={title}
              className="w-full h-full border-0"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
            />
          </div>
        ) : (
          // Dropdown links view
          <div className="space-y-2 max-h-[60vh] overflow-y-auto">
            {links?.map((link, index) => (
              <button
                key={index}
                onClick={() => handleLinkClick(link)}
                className="w-full text-left p-4 rounded-lg border border-slate-200/70 hover:bg-slate-50 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{link.label}</p>
                    {link.description && (
                      <p className="text-sm text-slate-600 mt-1">{link.description}</p>
                    )}
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 shrink-0 ml-2" />
                </div>
              </button>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NavigationDropdown;

