import { Loader2, MessageCircle, Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useSettings } from "../../hooks/useSettings";
import toast from "react-hot-toast";

const TelegramSettings = () => {
  const { getSettings, generateTelegramCode } = useSettings();
  const settingsData = getSettings?.data?.data?.data;
  const telegram = settingsData?.telegram;
  const [copied, setCopied] = useState(false);

  const handleGenerateCode = async () => {
    try {
      const response = await generateTelegramCode.mutateAsync();
      toast.success(response?.message || "Connect code generated");
    } catch {
      toast.error("Failed to generate code");
    }
  };

  const handleCopyCode = () => {
    if (telegram?.connectCode) {
      navigator.clipboard.writeText(telegram.connectCode);
      setCopied(true);
      toast.success("Code copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (getSettings.isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="animate-spin text-[#71717A]" size={30} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[24px]">
      <div className="bg-white border border-[#E2E4E9] rounded-[12px] p-[24px] flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[8px]">
          <div className="flex items-center gap-[10px]">
            <MessageCircle size={18} className="text-[#1D1D1D]" />
            <h2 className="text-[16px] font-medium text-[#1D1D1D] uppercase tracking-[0.9px]">
              Telegram Integration
            </h2>
          </div>
          <p className="text-[12px] text-[#71717A] font-medium tracking-[0.9px]">
            Connect your Telegram account to receive notifications and reports
          </p>
        </div>

        {telegram?.connected ? (
          <div className="flex flex-col gap-[16px]">
            <div className="flex items-center gap-[12px] bg-[#ECFDF3] border border-[#ABEFC6] rounded-[10px] p-[16px]">
              <CheckCircle2 size={20} className="text-[#067647] shrink-0" />
              <div className="flex flex-col gap-[2px]">
                <p className="text-[13px] font-medium text-[#067647]">
                  Telegram Connected
                </p>
                <p className="text-[11px] text-[#067647]/70">
                  Connected on{" "}
                  {telegram.connectedAt
                    ? new Date(telegram.connectedAt).toLocaleDateString(
                        "en-GB",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        },
                      )
                    : "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between bg-[#FAFAFB] border border-[#E2E4E9] rounded-[10px] p-[16px]">
              <div className="flex flex-col gap-[2px]">
                <p className="text-[12px] text-[#71717A] font-medium">
                  Chat ID
                </p>
                <p className="text-[14px] font-medium text-[#1D1D1D] font-mono">
                  {telegram.chatId}
                </p>
              </div>
            </div>

            <div className="bg-[#FFF8EB] border border-[#FEEDCB] rounded-[10px] p-[16px] flex flex-col gap-[8px]">
              <p className="text-[13px] font-medium text-[#B54708]">
                To disconnect:
              </p>
              <p className="text-[12px] text-[#B54708] leading-[20px]">
                Open <span className="font-bold">@CrystalStoreKeeperBot</span>{" "}
                on Telegram and send{" "}
                <code className="bg-[#FEEDCB] px-1.5 py-0.5 rounded text-[11px] font-mono font-bold">
                  /disconnect
                </code>
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-[20px]">
            <div className="bg-[#EFF8FF] border border-[#D1E9FF] rounded-[10px] p-[16px] flex flex-col gap-[12px]">
              <p className="text-[13px] font-medium text-[#175CD3]">
                How to connect:
              </p>
              <ol className="text-[12px] text-[#175CD3] font-medium leading-[22px] list-decimal list-inside space-y-1">
                <li>
                  Click "Generate Code" below to get your unique connect code
                </li>
                <li>
                  Open Telegram and search for{" "}
                  <span className="font-bold">@CrystalStoreKeeperBot</span>
                </li>
                <li>
                  Send{" "}
                  <code className="bg-[#D1E9FF] px-1.5 py-0.5 rounded text-[11px] font-mono font-bold">
                    /connect YOUR-CODE
                  </code>{" "}
                  to the bot (e.g.{" "}
                  <code className="bg-[#D1E9FF] px-1.5 py-0.5 rounded text-[11px] font-mono">
                    /connect CRYSTAL-a3f9b2
                  </code>
                  )
                </li>
                <li>The bot will confirm your store is connected</li>
              </ol>
            </div>

            {telegram?.connectCode ? (
              <div className="flex flex-col gap-[12px]">
                <p className="text-[13px] font-medium text-[#1D1D1D]">
                  Your Connect Code
                </p>
                <div className="flex items-center gap-[12px]">
                  <div className="flex-1 bg-[#FAFAFB] border border-[#E2E4E9] rounded-[10px] h-[52px] flex items-center justify-center">
                    <span className="text-[20px] font-bold text-[#1D1D1D] tracking-[4px] font-mono">
                      {telegram.connectCode}
                    </span>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="flex cursor-pointer items-center gap-2 px-4 h-[52px] bg-white border border-[#E2E4E9] rounded-[10px] text-[12px] font-medium text-[#1D1D1D] hover:bg-gray-50 transition-colors"
                  >
                    {copied ? (
                      <CheckCircle2 size={16} className="text-green-500" />
                    ) : (
                      <Copy size={16} />
                    )}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            ) : null}

            <button
              onClick={handleGenerateCode}
              disabled={generateTelegramCode.isPending}
              className="w-full cursor-pointer bg-[#2474F5] hover:bg-blue-600 text-white h-[44px] rounded-[10px] text-[13px] font-medium tracking-[0.9px] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {generateTelegramCode.isPending ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <MessageCircle size={16} />
              )}
              {telegram?.connectCode ? "Regenerate Code" : "Generate Code"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TelegramSettings;
