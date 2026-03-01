"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { BudgetBreakdown } from "@/types/travel";

interface BudgetChartProps {
  breakdown: BudgetBreakdown;
  userBudget: number;
  currency: string;
}

const COLORS = ["#3b82f6", "#f59e0b", "#10b981", "#8b5cf6", "#ef4444"];

export default function BudgetChart({ breakdown, userBudget, currency }: BudgetChartProps) {
  const data = [
    { name: "Accommodation", value: breakdown.accommodation },
    { name: "Food", value: breakdown.food },
    { name: "Activities", value: breakdown.activities },
    { name: "Transport", value: breakdown.transport },
    { name: "Miscellaneous", value: breakdown.miscellaneous },
  ];

  const isOverBudget = breakdown.total > userBudget;
  const difference = Math.abs(breakdown.total - userBudget);
  const percentage = Math.round((breakdown.total / userBudget) * 100);

  return (
    <div className="space-y-6">
      {/* Budget comparison */}
      <div className={`p-4 rounded-2xl ${isOverBudget ? "bg-red-50 dark:bg-red-900/20" : "bg-green-50 dark:bg-green-900/20"}`}>
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Estimated Total</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {currency} {breakdown.total.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 dark:text-gray-400">Your Budget</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {currency} {userBudget.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${isOverBudget ? "bg-red-500" : "bg-green-500"}`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>

        <div className={`mt-2 text-sm font-medium ${isOverBudget ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}>
          {isOverBudget
            ? `⚠️ ${currency} ${difference.toLocaleString()} over budget`
            : `✅ ${currency} ${difference.toLocaleString()} under budget`}
        </div>

        {isOverBudget && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            💡 Tip: Consider choosing a budget hotel, cooking some meals, or reducing activities to stay within budget.
          </p>
        )}
      </div>

      {/* Pie chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number | undefined) => [`${currency} ${(value ?? 0).toLocaleString()}`, ""]}
              contentStyle={{
                backgroundColor: "var(--tooltip-bg, white)",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Breakdown list */}
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
              <span className="text-sm text-gray-700 dark:text-gray-300">{item.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {currency} {item.value.toLocaleString()}
              </span>
              <span className="text-xs text-gray-400">
                ({Math.round((item.value / breakdown.total) * 100)}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
