
import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { defaultWhatsappData, defaultCrmContacts } from "@/data/defaults";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  QrCode,
  Send,
  Bot,
  CheckCircle,
  XCircle,
  Edit,
  Trash,
  PlusCircle,
  History,
  Users as UsersIcon,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

const WhatsappManager = () => {
  const [whatsappData, setWhatsappData] = useLocalStorage(
    "whatsappData",
    defaultWhatsappData
  );
  const [contacts] = useLocalStorage("crmContacts", defaultCrmContacts);
  const [showQr, setShowQr] = useState(false);

  // Contact selection and search
  const [search, setSearch] = useState("");
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  // Messaging state
  const [message, setMessage] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const { toast } = useToast();

  // Message sent log
  const [sentLog, setSentLog] = useState<{ to: string[]; content: string; timestamp: string }[]>([]);

  // --- Templates CRUD ---
  const [templateName, setTemplateName] = useState("");
  const [templateContent, setTemplateContent] = useState("");
  const [editTemplateId, setEditTemplateId] = useState<string | null>(null);

  // --- Flows CRUD ---
  const [flowName, setFlowName] = useState("");
  const [flowTrigger, setFlowTrigger] = useState("");
  const [newFlowSteps, setNewFlowSteps] = useState<any[]>([]);
  const [flowStepType, setFlowStepType] = useState<"send_message" | "wait">("send_message");
  const [flowStepTemplateId, setFlowStepTemplateId] = useState("");
  const [flowStepDelay, setFlowStepDelay] = useState("2m");
  const [flowStepDuration, setFlowStepDuration] = useState("5m");
  const [editingFlowId, setEditingFlowId] = useState<string | null>(null);
  const [activeFlowEditSteps, setActiveFlowEditSteps] = useState<any[]>([]);

  // --- UI handlers ---
  const handleContactSelect = (id: string) => {
    setSelectedContacts((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleBulkSend = () => {
    if (selectedContacts.length === 0 || (!message && !selectedTemplate)) {
      toast({
        title: "Error",
        description: "Please select contacts and enter a message or choose a template.",
        variant: "destructive",
      });
      return;
    }
    const msg = selectedTemplate
      ? whatsappData.templates.find((t: any) => t.id === selectedTemplate)?.content || ""
      : message;
    setSentLog([
      {
        to: selectedContacts.map(
          (id) => contacts.find((c: any) => c.id === id)?.name || id
        ),
        content: msg,
        timestamp: new Date().toLocaleString(),
      },
      ...sentLog,
    ]);
    toast({
      title: "Messages Sent (Simulated)",
      description: `Sent to ${selectedContacts.length} contacts.`,
    });
    setMessage("");
    setSelectedTemplate("");
    setSelectedContacts([]);
  };

  // --- Template CRUD handlers ---
  const handleAddOrEditTemplate = () => {
    if (!templateName || !templateContent) {
      toast({
        title: "Error",
        description: "Both template name and content are required.",
        variant: "destructive",
      });
      return;
    }
    if (editTemplateId) {
      setWhatsappData((prev: any) => ({
        ...prev,
        templates: prev.templates.map((t: any) =>
          t.id === editTemplateId
            ? { ...t, name: templateName, content: templateContent }
            : t
        ),
      }));
      toast({ title: "Template updated!" });
      setEditTemplateId(null);
    } else {
      setWhatsappData((prev: any) => ({
        ...prev,
        templates: [
          ...prev.templates,
          { id: generateId(), name: templateName, content: templateContent },
        ],
      }));
      toast({ title: "Template added." });
    }
    setTemplateName("");
    setTemplateContent("");
  };

  const handleTemplateEdit = (t: any) => {
    setTemplateName(t.name);
    setTemplateContent(t.content);
    setEditTemplateId(t.id);
  };

  const handleTemplateDelete = (id: string) => {
    setWhatsappData((prev: any) => ({
      ...prev,
      templates: prev.templates.filter((t: any) => t.id !== id),
    }));
    toast({ title: "Template deleted." });
    if (editTemplateId === id) {
      setTemplateName("");
      setTemplateContent("");
      setEditTemplateId(null);
    }
  };

  // --- Flow CRUD handlers ---
  const handleAddStepToFlow = () => {
    if (flowStepType === "send_message" && !flowStepTemplateId) {
      toast({ title: "Select a template for this step.", variant: "destructive" });
      return;
    }
    setNewFlowSteps([
      ...newFlowSteps,
      flowStepType === "send_message"
        ? { type: "send_message", templateId: flowStepTemplateId, delay: flowStepDelay }
        : { type: "wait", duration: flowStepDuration },
    ]);
    setFlowStepTemplateId("");
    setFlowStepDelay("2m");
    setFlowStepDuration("5m");
  };

  const handleAddOrEditFlow = () => {
    if (!flowName || !flowTrigger || newFlowSteps.length === 0) {
      toast({
        title: "Fill out all fields and add at least one step.",
        variant: "destructive",
      });
      return;
    }
    if (editingFlowId) {
      setWhatsappData((prev: any) => ({
        ...prev,
        flows: prev.flows.map((f: any) =>
          f.id === editingFlowId
            ? { ...f, name: flowName, trigger: flowTrigger, steps: activeFlowEditSteps }
            : f
        ),
      }));
      toast({ title: "Flow updated!" });
      setEditingFlowId(null);
      setActiveFlowEditSteps([]);
    } else {
      setWhatsappData((prev: any) => ({
        ...prev,
        flows: [
          ...prev.flows,
          { id: generateId(), name: flowName, trigger: flowTrigger, steps: newFlowSteps },
        ],
      }));
      toast({ title: "Flow added." });
      setNewFlowSteps([]);
    }
    setFlowName("");
    setFlowTrigger("");
  };

  const handleFlowEdit = (flow: any) => {
    setFlowName(flow.name);
    setFlowTrigger(flow.trigger);
    setEditingFlowId(flow.id);
    setActiveFlowEditSteps(flow.steps);
  };

  const handleFlowDelete = (id: string) => {
    setWhatsappData((prev: any) => ({
      ...prev,
      flows: prev.flows.filter((f: any) => f.id !== id),
    }));
    toast({ title: "Flow deleted." });
    if (editingFlowId === id) {
      setEditingFlowId(null);
      setFlowName("");
      setFlowTrigger("");
      setActiveFlowEditSteps([]);
    }
  };

  // Connect/disconnect WhatsApp (simulated)
  const handleConnect = () => {
    setShowQr(true);
    toast({
      title: "Simulating Connection...",
      description: "Please wait while we connect to WhatsApp.",
    });
    setTimeout(() => {
      setWhatsappData((prev: any) => ({
        ...prev,
        isConnected: true,
      }));
      setShowQr(false);
      toast({
        title: "Success!",
        description: "Connected to WhatsApp Business API.",
      });
    }, 3000);
  };

  const handleDisconnect = () => {
    setWhatsappData((prev: any) => ({
      ...prev,
      isConnected: false,
    }));
    toast({
      title: "Disconnected",
      description: "You have been disconnected from WhatsApp.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-8 text-gray-700">
      {/* Connection card */}
      <Card className="bg-gray-200 border-none shadow-neumorphic rounded-2xl">
        <CardHeader>
          <CardTitle>WhatsApp Connection</CardTitle>
          <CardDescription>
            Connect your WhatsApp Business Account to start.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {whatsappData.isConnected ? (
            <div className="flex items-center gap-4">
              <p className="flex items-center text-green-600 font-semibold">
                <CheckCircle className="mr-2 h-5 w-5" />
                Connected
              </p>
              <Button
                onClick={handleDisconnect}
                className="text-white bg-red-500 hover:bg-red-600 shadow-neumorphic active:shadow-neumorphic-inset rounded-xl transform active:scale-95 transition-all"
              >
                <XCircle className="mr-2 h-4 w-4" /> Disconnect
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Button
                onClick={handleConnect}
                disabled={showQr}
                className="bg-gray-200 text-gray-700 shadow-neumorphic active:shadow-neumorphic-inset hover:text-primary rounded-xl transform active:scale-95 transition-all"
              >
                <QrCode className="mr-2 h-4 w-4" />
                {showQr ? "Scanning..." : "Connect with QR Code"}
              </Button>
              {showQr && (
                <p className="text-sm text-gray-500">
                  Please scan the QR code in your WhatsApp app. Simulating...
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {whatsappData.isConnected && (
        <>
          {/* Bulk Message Card */}
          <Card className="bg-gray-200 border-none shadow-neumorphic rounded-2xl">
            <CardHeader>
              <CardTitle>
                <UsersIcon className="inline-block w-5 h-5 mr-2" />
                Bulk Messaging
              </CardTitle>
              <CardDescription>
                Send a message or template to multiple CRM contacts.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Contact search & selection */}
              <div>
                <label className="text-sm font-medium block mb-1 pl-2">
                  Filter/Search Contacts
                </label>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Search by name or phone..."
                  className="bg-gray-100 border-none shadow-neumorphic-inset rounded px-3 py-2 w-full mb-2"
                />
                <div className="max-h-32 overflow-y-auto bg-gray-100 rounded-lg shadow-neumorphic-inset p-2 flex flex-wrap gap-1">
                  {filteredContacts.map((contact) => (
                    <button
                      key={contact.id}
                      onClick={() => handleContactSelect(contact.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium border transition-all m-1 ${
                        selectedContacts.includes(contact.id)
                          ? "bg-green-200 text-green-800 border-green-400"
                          : "bg-gray-50 text-gray-600 border-gray-300 hover:bg-gray-200"
                      }`}
                      type="button"
                    >
                      {contact.name} ({contact.phone})
                    </button>
                  ))}
                  {filteredContacts.length === 0 && (
                    <div className="text-xs text-gray-400">No contacts found.</div>
                  )}
                </div>
              </div>
              {/* Choose a template or write a message */}
              <div className="flex gap-4 flex-col md:flex-row">
                <div className="flex-1">
                  <label className="text-sm font-medium block mb-1 pl-2">
                    Use Template (optional)
                  </label>
                  <Select
                    value={selectedTemplate}
                    onValueChange={setSelectedTemplate}
                  >
                    <SelectTrigger className="bg-gray-200 border-none shadow-neumorphic-inset rounded-lg focus:ring-0">
                      <SelectValue placeholder="Choose a template..." />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-200 border-gray-300">
                      {whatsappData.templates.map((template: any) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium block mb-1 pl-2">
                    Or Write a Message
                  </label>
                  <Textarea
                    placeholder="Type your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="bg-gray-200 border-none shadow-neumorphic-inset rounded-lg focus:ring-0"
                  />
                </div>
              </div>
              <Button
                onClick={handleBulkSend}
                className="bg-gray-200 text-gray-700 shadow-neumorphic active:shadow-neumorphic-inset hover:text-primary rounded-xl transform active:scale-95 transition-all"
              >
                <Send className="mr-2 h-4 w-4" /> Send Message(s)
              </Button>
            </CardContent>
          </Card>

          {/* Sent Log */}
          <Card className="bg-gray-200 border-none shadow-neumorphic rounded-2xl">
            <CardHeader>
              <CardTitle>
                <History className="inline-block w-5 h-5 mr-2" />
                Sent Message Log
              </CardTitle>
              <CardDescription>
                View past sent messages during this session.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {sentLog.length === 0 ? (
                <div className="text-gray-400 text-sm">No messages sent yet.</div>
              ) : (
                <ul className="space-y-3">
                  {sentLog.map((log, idx) => (
                    <li
                      key={idx}
                      className="bg-white rounded-lg p-3 shadow-neumorphic flex flex-col gap-1"
                    >
                      <span className="font-semibold">
                        To: {log.to.join(", ")}
                      </span>
                      <span className="text-xs text-gray-400">
                        {log.timestamp}
                      </span>
                      <span className="text-gray-800 font-mono mt-1">
                        {log.content}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* Template CRUD */}
          <Card className="bg-gray-200 border-none shadow-neumorphic rounded-2xl">
            <CardHeader>
              <CardTitle>
                <Bot className="inline-block w-5 h-5 mr-2" />
                Message Templates
              </CardTitle>
              <CardDescription>
                Manage, add, and edit pre-approved WhatsApp templates.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                className="flex flex-col md:flex-row gap-4 mb-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddOrEditTemplate();
                }}
              >
                <input
                  type="text"
                  placeholder="Template Name"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  className="flex-1 bg-white px-3 py-2 shadow-neumorphic-inset rounded-md"
                />
                <input
                  type="text"
                  placeholder="Template Content"
                  value={templateContent}
                  onChange={(e) => setTemplateContent(e.target.value)}
                  className="flex-2 bg-white px-3 py-2 shadow-neumorphic-inset rounded-md"
                />
                <Button
                  type="submit"
                  variant={editTemplateId ? "secondary" : "default"}
                  className="h-11"
                >
                  <PlusCircle className="h-4 w-4 mr-1" />
                  {editTemplateId ? "Update" : "Add"}
                </Button>
                {editTemplateId && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setEditTemplateId(null);
                      setTemplateName("");
                      setTemplateContent("");
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </form>
              <div className="space-y-4">
                {whatsappData.templates.length === 0 && (
                  <div className="text-gray-400 text-center text-sm">
                    No templates yet.
                  </div>
                )}
                {whatsappData.templates.map((template: any) => (
                  <div
                    key={template.id}
                    className="p-3 rounded-lg bg-gray-200 shadow-neumorphic flex items-center justify-between gap-2"
                  >
                    <div>
                      <span className="font-semibold">{template.name}</span>
                      <span className="block text-xs text-gray-600 font-mono mt-1">
                        {template.content}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleTemplateEdit(template)}
                      >
                        <Edit className="w-4 h-4 mr-1" /> Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleTemplateDelete(template.id)}
                      >
                        <Trash className="w-4 h-4 mr-1" /> Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Flows Advanced Editor */}
          <Card className="bg-gray-200 border-none shadow-neumorphic rounded-2xl">
            <CardHeader>
              <CardTitle>
                <Bot className="inline-block w-5 h-5 mr-2" />
                Visual Flow Editor
              </CardTitle>
              <CardDescription>
                Create, edit, and manage automated WhatsApp flows.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Flow creation/editing form */}
              <form
                className="mb-6 flex flex-col gap-3 bg-white rounded-lg p-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (editingFlowId) {
                    handleAddOrEditFlow();
                  } else {
                    handleAddOrEditFlow();
                  }
                }}
              >
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Flow Name"
                    value={flowName}
                    onChange={(e) => setFlowName(e.target.value)}
                    className="flex-1 bg-gray-200 px-3 py-2 shadow-neumorphic-inset rounded"
                  />
                  <input
                    type="text"
                    placeholder="Trigger Word or Condition"
                    value={flowTrigger}
                    onChange={(e) => setFlowTrigger(e.target.value)}
                    className="flex-1 bg-gray-200 px-3 py-2 shadow-neumorphic-inset rounded"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <select
                    value={flowStepType}
                    onChange={(e) =>
                      setFlowStepType(
                        e.target.value as "send_message" | "wait"
                      )
                    }
                    className="bg-gray-100 rounded px-3 py-2 border"
                  >
                    <option value="send_message">Send Message</option>
                    <option value="wait">Wait</option>
                  </select>
                  {flowStepType === "send_message" ? (
                    <>
                      <select
                        value={flowStepTemplateId}
                        onChange={(e) =>
                          setFlowStepTemplateId(e.target.value)
                        }
                        className="bg-gray-100 rounded px-3 py-2 border"
                      >
                        <option value="">Choose Template</option>
                        {whatsappData.templates.map((t: any) => (
                          <option value={t.id} key={t.id}>
                            {t.name}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={flowStepDelay}
                        onChange={(e) => setFlowStepDelay(e.target.value)}
                        placeholder="Delay (e.g. 2m)"
                        className="bg-gray-100 rounded px-3 py-2 border w-32"
                      />
                    </>
                  ) : (
                    <input
                      type="text"
                      value={flowStepDuration}
                      onChange={(e) => setFlowStepDuration(e.target.value)}
                      placeholder="Duration (e.g. 5m)"
                      className="bg-gray-100 rounded px-3 py-2 border w-32"
                    />
                  )}
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleAddStepToFlow}
                  >
                    Add Step
                  </Button>
                </div>
                {/* Steps Preview */}
                <div className="flex flex-wrap gap-2">
                  {editingFlowId
                    ? activeFlowEditSteps.map((step, idx) => (
                        <span
                          className="bg-green-50 border border-green-300 text-green-900 px-3 py-1 rounded-full text-xs font-medium"
                          key={idx}
                        >
                          {step.type === "send_message"
                            ? `Send "${whatsappData.templates.find((t: any) => t.id === step.templateId)?.name}" (Delay: ${step.delay})`
                            : `Wait ${step.duration}`}
                        </span>
                      ))
                    : newFlowSteps.map((step, idx) => (
                        <span
                          className="bg-blue-50 border border-blue-300 text-blue-900 px-3 py-1 rounded-full text-xs font-medium"
                          key={idx}
                        >
                          {step.type === "send_message"
                            ? `Send "${whatsappData.templates.find((t: any) => t.id === step.templateId)?.name}" (Delay: ${step.delay})`
                            : `Wait ${step.duration}`}
                        </span>
                      ))}
                </div>
                <Button type="submit">
                  <PlusCircle className="w-4 h-4 mr-1" />
                  {editingFlowId ? "Update Flow" : "Create Flow"}
                </Button>
                {editingFlowId && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setEditingFlowId(null);
                      setFlowName("");
                      setFlowTrigger("");
                      setActiveFlowEditSteps([]);
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </form>
              {/* List flows */}
              {whatsappData.flows.length === 0 && (
                <div className="text-gray-400 text-center text-sm">
                  No flows yet. Create your first flow!
                </div>
              )}
              <div className="space-y-4">
                {whatsappData.flows.map((flow: any) => (
                  <div
                    key={flow.id}
                    className="p-4 border-none rounded-2xl shadow-neumorphic bg-whatsapp-50/20"
                  >
                    <div className="flex items-center gap-2 justify-between pb-2">
                      <span className="font-semibold text-lg flex items-center">
                        <Bot className="mr-2 h-5 w-5" />
                        {flow.name}
                      </span>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleFlowEdit(flow)}
                        >
                          <Edit className="w-4 h-4 mr-1" /> Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleFlowDelete(flow.id)}
                        >
                          <Trash className="w-4 h-4 mr-1" /> Delete
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">
                      Trigger:{" "}
                      <span className="font-medium bg-blue-200 text-blue-800 px-2 py-1 rounded-full shadow-neumorphic">
                        {flow.trigger}
                      </span>
                    </p>
                    <div className="space-y-3">
                      {flow.steps.map((step, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 p-3 bg-gray-200 rounded-lg shadow-neumorphic"
                        >
                          <span className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 text-xs font-bold text-gray-700 shadow-neumorphic">
                            {index + 1}
                          </span>
                          {step.type === "send_message" ? (
                            <p>
                              Send message:{" "}
                              <span className="font-semibold">
                                {
                                  whatsappData.templates.find(
                                    (t: any) => t.id === step.templateId
                                  )?.name
                                }
                              </span>
                              <span className="text-sm text-gray-500 ml-2">
                                (Delay: {step.delay})
                              </span>
                            </p>
                          ) : (
                            <p>
                              Wait for{" "}
                              <span className="font-semibold">
                                {step.duration}
                              </span>
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default WhatsappManager;
