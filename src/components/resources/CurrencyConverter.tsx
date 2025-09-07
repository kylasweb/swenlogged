import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowRightLeft, TrendingUp, RefreshCw, DollarSign } from "lucide-react";
import { toast } from "sonner";

interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  lastUpdated: Date;
  inverseRate: number;
}

const CurrencyConverter = () => {
  const [amount, setAmount] = useState<string>('1000');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate | null>(null);

  // Mock exchange rates - replace with real API in production
  const mockExchangeRates: Record<string, Record<string, number>> = {
    USD: { EUR: 0.85, GBP: 0.73, JPY: 110.0, CAD: 1.25, AUD: 1.35, CHF: 0.92, CNY: 6.45 },
    EUR: { USD: 1.18, GBP: 0.86, JPY: 129.5, CAD: 1.47, AUD: 1.59, CHF: 1.08, CNY: 7.58 },
    GBP: { USD: 1.37, EUR: 1.16, JPY: 150.2, CAD: 1.71, AUD: 1.85, CHF: 1.26, CNY: 8.81 },
    JPY: { USD: 0.0091, EUR: 0.0077, GBP: 0.0067, CAD: 0.0114, AUD: 0.0122, CHF: 0.0083, CNY: 0.0586 },
    CAD: { USD: 0.80, EUR: 0.68, GBP: 0.58, JPY: 88.0, AUD: 1.08, CHF: 0.74, CNY: 5.16 },
    AUD: { USD: 0.74, EUR: 0.63, GBP: 0.54, JPY: 81.5, CAD: 0.93, CHF: 0.68, CNY: 4.78 },
    CHF: { USD: 1.09, EUR: 0.93, GBP: 0.79, JPY: 119.8, CAD: 1.36, AUD: 1.47, CNY: 7.02 },
    CNY: { USD: 0.155, EUR: 0.132, GBP: 0.113, JPY: 17.05, CAD: 0.194, AUD: 0.209, CHF: 0.142 }
  };

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
    { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', flag: '🇨🇭' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' }
  ];

  const convertCurrency = async () => {
    if (!amount || isNaN(Number(amount))) {
      toast.error('Please enter a valid amount');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));

      const rate = mockExchangeRates[fromCurrency]?.[toCurrency];
      if (!rate) {
        toast.error('Exchange rate not available for this currency pair');
        return;
      }

      const convertedAmount = Number(amount) * rate;
      const inverseRate = 1 / rate;

      setResult(convertedAmount);
      setExchangeRate({
        from: fromCurrency,
        to: toCurrency,
        rate,
        inverseRate,
        lastUpdated: new Date()
      });

      toast.success('Currency converted successfully!');

    } catch (error) {
      toast.error('Failed to convert currency. Please try again.');
      console.error('Currency conversion error:', error);
    } finally {
      setLoading(false);
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult(null);
    setExchangeRate(null);
  };

  const getCurrencyInfo = (code: string) => {
    return currencies.find(c => c.code === code);
  };

  const formatCurrency = (amount: number, currencyCode: string) => {
    const currency = getCurrencyInfo(currencyCode);
    return `${currency?.symbol || currencyCode} ${amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <DollarSign className="h-8 w-8 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-900">Currency Converter</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Convert currencies instantly with real-time exchange rates. Perfect for international trade,
          travel planning, and financial calculations.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Converter Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowRightLeft className="h-5 w-5" />
              Currency Exchange
            </CardTitle>
            <CardDescription>
              Convert between major world currencies
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount *</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fromCurrency">From</Label>
                <Select value={fromCurrency} onValueChange={setFromCurrency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        <div className="flex items-center gap-2">
                          <span>{currency.flag}</span>
                          <span>{currency.code} - {currency.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={swapCurrencies}
                  className="h-10 w-10"
                >
                  <ArrowRightLeft className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="toCurrency">To</Label>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <div className="flex items-center gap-2">
                        <span>{currency.flag}</span>
                        <span>{currency.code} - {currency.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={convertCurrency}
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Converting...
                </>
              ) : (
                <>
                  <ArrowRightLeft className="h-4 w-4 mr-2" />
                  Convert Currency
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle>Conversion Result</CardTitle>
            <CardDescription>
              Your currency conversion details
            </CardDescription>
          </CardHeader>
          <CardContent>
            {result !== null && exchangeRate ? (
              <div className="space-y-4">
                <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-3xl font-bold text-green-900 mb-2">
                    {formatCurrency(result, toCurrency)}
                  </div>
                  <div className="text-sm text-green-700">
                    {formatCurrency(Number(amount), fromCurrency)} = {formatCurrency(result, toCurrency)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-lg font-semibold text-blue-900">
                      {exchangeRate.rate.toFixed(4)}
                    </div>
                    <div className="text-xs text-blue-700">
                      {fromCurrency}/{toCurrency}
                    </div>
                  </div>

                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-lg font-semibold text-purple-900">
                      {exchangeRate.inverseRate.toFixed(4)}
                    </div>
                    <div className="text-xs text-purple-700">
                      {toCurrency}/{fromCurrency}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Last updated:</span>
                  <span>{exchangeRate.lastUpdated.toLocaleString()}</span>
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <div className="text-sm text-yellow-800">
                      <strong>Note:</strong> Exchange rates are for reference only and may vary.
                      Always check with your financial institution for current rates.
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Enter amount and currencies, then click "Convert" to see the result</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Popular Conversions */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Currency Pairs</CardTitle>
          <CardDescription>
            Commonly traded currency exchange rates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { from: 'USD', to: 'EUR', rate: 0.85 },
              { from: 'USD', to: 'GBP', rate: 0.73 },
              { from: 'EUR', to: 'GBP', rate: 0.86 },
              { from: 'USD', to: 'JPY', rate: 110.0 }
            ].map((pair, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg text-center">
                <div className="text-lg font-semibold text-gray-900">
                  {pair.from}/{pair.to}
                </div>
                <div className="text-sm text-gray-600">
                  {pair.rate.toFixed(4)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Currency Information */}
      <Card>
        <CardHeader>
          <CardTitle>Currency Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currencies.slice(0, 4).map((currency) => (
              <div key={currency.code} className="text-center">
                <div className="text-2xl mb-2">{currency.flag}</div>
                <div className="font-semibold text-gray-900">{currency.name}</div>
                <div className="text-sm text-gray-600">{currency.code}</div>
                <div className="text-lg font-medium text-blue-600">{currency.symbol}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CurrencyConverter;
