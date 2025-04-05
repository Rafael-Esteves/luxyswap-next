"use client";

import { Navbar } from "@/components/navbar";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSwapStore } from "@/store/use-swap-store";
import { ArrowLeftRight, Check, Copy, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useRefundAddress } from "@/hooks/use-refund-address";

// page

interface ShiftData {
  id: string;
  depositAddress: string;
  depositCoin: string;
  settleCoin: string;
  depositAmount?: string;
  settleAmount?: string;
  expiresAt: string;
  createdAt: string;
  status: string;
}

// Create a client component to handle the search params
function SwapContent() {
  const { fromCoin, toCoin, ethAddress } = useSwapStore();
  const searchParams = useSearchParams();
  const shiftId = searchParams?.get("id");

  const [shiftData, setShiftData] = useState<ShiftData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  // Refund address state
  const [refundAddress, setRefundAddress] = useState("");
  const [refundMemo, setRefundMemo] = useState("");
  const { setRefundAddress: submitRefundAddress, isLoading: isRefundLoading, error: refundError, success: refundSuccess } = useRefundAddress();

  useEffect(() => {
    if (!shiftId) return;

    const fetchShiftData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/sideshift/shift/${shiftId}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch shift data: ${response.statusText}`);
        }

        const data = await response.json();
        setShiftData(data);
      } catch (error) {
        console.error("Error fetching shift data:", error);
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShiftData();

    // Set up an interval to periodically check the shift status
    const interval = setInterval(fetchShiftData, 30000); // every 30 seconds

    return () => clearInterval(interval);
  }, [shiftId]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Falha ao copiar texto: ", err);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getStatusText = (status: string) => {
    console.log(status);
    switch (status.toLowerCase()) {
      case "pending":
        return "Pendente";
      case "waiting":
        return "Aguardando";
      case "processing":
        return "Processando";
      case "settled":
        return "Concluído";
      case "failed":
        return "Falhou";
      case "expired":
        return "Expirado";
      case "cancelled":
        return "Cancelado";
      case "refunded":
        return "Reembolsado";
      case "review":
        return "Em Revisão";
      case "refund":
        return "Reembolso Pendente";
      case "multiple":
        return "Múltiplos Depósitos";
      default:
        return "Pendente";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
      case "waiting":
        return "text-yellow-400";
      case "processing":
        return "text-blue-400";
      case "settled":
        return "text-green-400";
      case "failed":
      case "refund":
        return "text-red-400";
      case "review":
      case "multiple":
        return "text-orange-400";
      default:
        return "text-white";
    }
  };

  const needsRefundAddress = (status: string) => {
    const statuses = ["review", "refund", "multiple"];
    return statuses.includes(status.toLowerCase());
  };

  const handleRefundSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!shiftId || !refundAddress) return;
    
    const success = await submitRefundAddress({
      shiftId,
      refundAddress,
      refundMemo
    });
    
    if (success) {
      // Trigger a refresh of the shift data
      const response = await fetch(`/api/sideshift/shift/${shiftId}`);
      if (response.ok) {
        const data = await response.json();
        setShiftData(data);
      }
    }
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto mt-10 p-6 bg-black/30 backdrop-blur-md rounded-2xl">
        <h1 className="text-2xl font-gravesend font-bold text-center">
          Detalhes do Swap
        </h1>
        <div className="flex justify-center items-center py-6">
          {isLoading && (
            <div className="animate-spin size-10 rounded-full border-4 border-white/20 border-t-white" />
          )}
          {!isLoading && <div className="size-10" />}
        </div>

        {error && (
          <div className="text-red-400 bg-red-900/20 p-4 rounded-lg mb-4">
            <p>Erro: {error}</p>
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "mt-4 w-full"
              )}
            >
              Voltar para o Início
            </Link>
          </div>
        )}

        {shiftData && (
          <div className="space-y-6">
            <div className="bg-white/5 p-4 rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-medium">Status</h2>
                <span
                  className={cn(
                    "font-medium",
                    getStatusColor(shiftData.status)
                  )}
                >
                  {getStatusText(shiftData.status)}
                </span>
              </div>
              <p className="text-sm text-white/60">ID: {shiftData.id}</p>
              <p className="text-sm text-white/60">
                Criado: {formatDate(shiftData.createdAt)}
              </p>
              <p className="text-sm text-white/60">
                Expira: {formatDate(shiftData.expiresAt)}
              </p>
            </div>

            {/* Refund Address UI */}
            {shiftData && needsRefundAddress(shiftData.status) && (
              <div className="bg-orange-900/20 p-4 rounded-xl">
                <h2 className="text-lg font-medium mb-2 text-orange-400">
                  Endereço de Reembolso
                </h2>
                <p className="text-sm text-white/70 mb-4">
                  Para receber seu reembolso, informe um endereço válido para receber os fundos.
                </p>
                
                {refundSuccess ? (
                  <div className="bg-green-900/20 p-3 rounded-lg text-green-400 text-sm mb-4">
                    Endereço de reembolso definido com sucesso!
                  </div>
                ) : (
                  <form onSubmit={handleRefundSubmit} className="space-y-3">
                    <div>
                      <input
                        type="text"
                        value={refundAddress}
                        onChange={(e) => setRefundAddress(e.target.value)}
                        placeholder={`Endereço de reembolso para ${shiftData.depositCoin.split("-")[0]}`}
                        className="w-full bg-black/20 p-3 rounded-lg text-white placeholder-white/50 text-sm"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        value={refundMemo}
                        onChange={(e) => setRefundMemo(e.target.value)}
                        placeholder="Memo (opcional)"
                        className="w-full bg-black/20 p-3 rounded-lg text-white placeholder-white/50 text-sm"
                      />
                      <p className="text-xs text-white/50 mt-1">
                        Algumas moedas exigem um memo/tag adicional
                      </p>
                    </div>
                    
                    {refundError && (
                      <div className="text-red-400 text-sm">
                        Erro: {refundError}
                      </div>
                    )}
                    
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={isRefundLoading}
                    >
                      {isRefundLoading ? 'Salvando...' : 'Salvar Endereço de Reembolso'}
                    </Button>
                  </form>
                )}
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="text-center">
                <p className="text-sm text-white/60">De</p>
                <div className="flex items-center justify-center mt-1">
                  <Image
                    src={`/coin-icons/${shiftData.depositCoin
                      .split("-")[0]
                      .toLowerCase()}.svg`}
                    alt={shiftData.depositCoin}
                    width={24}
                    height={24}
                    className="mr-2"
                  />
                  <p className="font-medium">
                    {shiftData.depositCoin.split("-")[0]}
                  </p>
                </div>
                <p className="mt-1 font-bold">
                  {shiftData.depositAmount || fromCoin.value}
                </p>
              </div>

              <div className="bg-white/10 p-2 rounded-full">
                <ArrowLeftRight className="size-5" />
              </div>

              <div className="text-center">
                <p className="text-sm text-white/60">Para</p>
                <div className="flex items-center justify-center mt-1">
                  <Image
                    src={`/coin-icons/${shiftData.settleCoin
                      .split("-")[0]
                      .toLowerCase()}.svg`}
                    alt={shiftData.settleCoin}
                    width={24}
                    height={24}
                    className="mr-2"
                  />
                  <p className="font-medium">
                    {shiftData.settleCoin.split("-")[0]}
                  </p>
                </div>
                <p className="mt-1 font-bold">
                  {shiftData.settleAmount || toCoin.value}
                </p>
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded-xl">
              <h2 className="text-lg font-medium mb-2">Endereço de Depósito</h2>
              <div className="bg-black/20 p-3 rounded-lg flex items-center justify-between break-all text-sm">
                <span>{shiftData.depositAddress}</span>
                <button
                  onClick={() => copyToClipboard(shiftData.depositAddress)}
                  className="ml-2 p-1 hover:bg-white/10 rounded"
                >
                  {copied ? (
                    <Check className="size-4 text-green-400" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </button>
              </div>
              <p className="mt-2 text-sm text-white/60">
                Envie exatamente{" "}
                <span className="font-bold text-white">
                  {shiftData.depositAmount || fromCoin.value}{" "}
                  {shiftData.depositCoin.split("-")[0]}
                </span>{" "}
                para este endereço
              </p>
            </div>

            <div className="flex gap-2">
              <Link
                href="/"
                className={cn(buttonVariants({ variant: "outline" }), "w-full")}
              >
                Início
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// Main page component with Suspense boundary
export default function Page() {
  return (
    <div className="w-full bg-swap-gradient bg-cover bg-no-repeat">
      <div className="w-full bg-swap relative bg-cover bg-no-repeat min-h-screen">
        <AnimatedContainer className="w-full flex items-center justify-center flex-col">
          <Navbar />

          <Suspense
            fallback={
              <div className="w-full max-w-md mx-auto mt-10 p-6 bg-black/30 backdrop-blur-md rounded-2xl">
                <h1 className="text-2xl font-gravesend font-bold text-center mb-6">
                  Detalhes do Swap
                </h1>
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin size-10 rounded-full border-4 border-white/20 border-t-white" />
                </div>
              </div>
            }
          >
            <SwapContent />
          </Suspense>
        </AnimatedContainer>
      </div>
    </div>
  );
}
