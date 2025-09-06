
import { useState } from "react";
import { Shield, Lock, Bug, Cloud } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const securityTools = [
  {
    key: "access",
    name: "Access Control",
    description: "Configure user roles and permissions.",
    icon: <Lock className="text-primary w-6 h-6" />,
    actionLabel: "Update Roles",
    loadingLabel: "Updating...",
    toastTitle: "Roles updated",
    toastDescription: "User roles and permissions have been saved.",
  },
  {
    key: "bot",
    name: "Bot Protection",
    description: "Activate reCAPTCHA and anti-bot features.",
    icon: <Bug className="text-yellow-500 w-6 h-6" />,
    actionLabel: "Enable Bot Protection",
    loadingLabel: "Activating...",
    toastTitle: "Bot protection enabled",
    toastDescription: "Anti-bot features are now active.",
  },
  {
    key: "ssl",
    name: "SSL/HTTPS Settings",
    description: "Manage certificate and HTTPS preferences.",
    icon: <Cloud className="text-green-500 w-6 h-6" />,
    actionLabel: "Renew Certificate",
    loadingLabel: "Renewing...",
    toastTitle: "SSL renewed",
    toastDescription: "SSL certificate has been successfully renewed.",
  },
];

const SecurityManager = () => {
  const [loadingKey, setLoadingKey] = useState<string | null>(null);

  const handleAction = (key: string) => {
    setLoadingKey(key);
    setTimeout(() => {
      const tool = securityTools.find((t) => t.key === key);
      setLoadingKey(null);
      toast({
        title: tool?.toastTitle || "Done",
        description: tool?.toastDescription,
      });
    }, 1200);
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Shield className="w-7 h-7 text-primary" />
        Website Security Tools
      </h2>
      <ul className="space-y-4">
        {securityTools.map((tool) => (
          <li key={tool.key} className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
            {tool.icon}
            <div className="flex-1">
              <div className="font-semibold">{tool.name}</div>
              <div className="text-gray-500 text-sm mb-2">{tool.description}</div>
              <Button
                size="sm"
                disabled={loadingKey === tool.key}
                onClick={() => handleAction(tool.key)}
              >
                {loadingKey === tool.key ? tool.loadingLabel : tool.actionLabel}
              </Button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 text-gray-400 text-sm">
        * Integrate each module as required for enhanced site security.
      </div>
    </section>
  );
};

export default SecurityManager;
