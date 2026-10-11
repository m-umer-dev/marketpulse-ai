import { useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  ChevronDown,
  CircleHelp,
  Command,
  Download,
  LayoutDashboard,
  MessageSquareText,
  Package,
  Search,
  Settings2,
  ShoppingBag,
  Sparkles,
  Upload,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./App.css";

const chartData = {
  "7D": [
    { date: "Mon", revenue: 4200, previous: 3600 },
    { date: "Tue", revenue: 5800, previous: 4100 },
    { date: "Wed", revenue: 4900, previous: 4700 },
    { date: "Thu", revenue: 7600, previous: 5300 },
    { date: "Fri", revenue: 6800, previous: 4900 },
    { date: "Sat", revenue: 9400, previous: 6100 },
    { date: "Sun", revenue: 8100, previous: 6700 },
  ],
  "30D": [
    { date: "Sep 12", revenue: 18000, previous: 14000 },
    { date: "Sep 16", revenue: 24000, previous: 19000 },
    { date: "Sep 20", revenue: 21000, previous: 22000 },
    { date: "Sep 24", revenue: 35000, previous: 26000 },
    { date: "Sep 28", revenue: 31000, previous: 28000 },
    { date: "Oct 02", revenue: 42000, previous: 31000 },
    { date: "Oct 06", revenue: 39000, previous: 34000 },
    { date: "Oct 10", revenue: 52000, previous: 37000 },
  ],
  "90D": [
    { date: "Jul", revenue: 48000, previous: 39000 },
    { date: "Mid Jul", revenue: 57000, previous: 44000 },
    { date: "Aug", revenue: 53000, previous: 48000 },
    { date: "Mid Aug", revenue: 71000, previous: 51000 },
    { date: "Sep", revenue: 68000, previous: 57000 },
    { date: "Mid Sep", revenue: 84000, previous: 62000 },
    { date: "Oct", revenue: 96000, previous: 71000 },
  ],
};

const products = [
  {
    name: "Everyday Sneakers",
    category: "Footwear",
    initials: "ES",
    color: "mint",
    sales: "1,284",
    revenue: "$38,520",
    change: "+18.6%",
  },
  {
    name: "Essential Hoodie",
    category: "Apparel",
    initials: "EH",
    color: "purple",
    sales: "962",
    revenue: "$28,860",
    change: "+12.3%",
  },
  {
    name: "Studio Backpack",
    category: "Accessories",
    initials: "SB",
    color: "orange",
    sales: "845",
    revenue: "$25,350",
    change: "+8.4%",
  },
  {
    name: "Classic Timepiece",
    category: "Accessories",
    initials: "CT",
    color: "blue",
    sales: "619",
    revenue: "$18,570",
    change: "+5.2%",
  },
];

const navGroups = [
  {
    label: "WORKSPACE",
    items: [
      { label: "Overview", icon: LayoutDashboard },
      { label: "Sales analytics", icon: Activity },
      { label: "Products", icon: Package },
      { label: "Customers", icon: Users },
      { label: "Reviews", icon: MessageSquareText },
    ],
  },
  {
    label: "INTELLIGENCE",
    items: [
      { label: "AI analyst", icon: Sparkles, badge: "AI" },
      { label: "Data sources", icon: Upload },
    ],
  },
];

function App() {
  const [period, setPeriod] = useState<keyof typeof chartData>("30D");
  const [activePage, setActivePage] = useState("Overview");
  const [question, setQuestion] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);

  const isOverview = activePage === "Overview";

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a
          className="brand"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setActivePage("Overview");
          }}
        >
          <span className="brand-mark">
            <Activity size={22} strokeWidth={2.5} />
          </span>
          <span className="brand-name">
            marketpulse<span>.ai</span>
          </span>
        </a>

        <button className="store-switcher">
          <span className="store-avatar">N</span>
          <span className="store-details">
            <strong>Northstar Goods</strong>
            <small>Free demo workspace</small>
          </span>
          <ChevronDown size={15} className="muted-icon" />
        </button>

        <div className="nav-scroll">
          {navGroups.map((group) => (
            <div className="nav-group" key={group.label}>
              <div className="nav-label">{group.label}</div>
              {group.items.map(({ label, icon: Icon, badge }) => (
                <button
                  key={label}
                  className={`nav-item ${activePage === label ? "active" : ""}`}
                  onClick={() => {
                    setActivePage(label);
                    setShowAnswer(false);
                  }}
                >
                  <Icon size={18} strokeWidth={1.8} />
                  <span>{label}</span>
                  {badge && <span className="nav-badge">{badge}</span>}
                </button>
              ))}
            </div>
          ))}
        </div>

        <div className="sidebar-bottom">
          <div className="usage-card">
            <div className="usage-heading">
              <Zap size={15} /> Your workspace
            </div>
            <p>Your demo workspace is ready to explore.</p>
            <div className="usage-bar">
              <span />
            </div>
            <small>Sample data · No connection required</small>
          </div>
          <button
            className="nav-item"
            onClick={() => setActivePage("Settings")}
          >
            <Settings2 size={18} />
            <span>Settings</span>
          </button>
          <button
            className="nav-item"
            onClick={() => setActivePage("Help & support")}
          >
            <CircleHelp size={18} />
            <span>Help & support</span>
          </button>
          <div className="profile-row">
            <div className="profile-avatar">U</div>
            <div className="profile-details">
              <strong>Store owner</strong>
              <small>Demo account</small>
            </div>
            <button className="icon-button" aria-label="Profile options">
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="breadcrumbs">
            <span>Workspace</span>
            <span className="crumb-slash">/</span>
            <strong>{activePage}</strong>
          </div>
          <div className="topbar-actions">
            <div className="demo-status">
              <span /> Demo environment
            </div>
            <button className="icon-button top-search" aria-label="Search">
              <Search size={18} />
            </button>
            <button
              className="icon-button notification-button"
              aria-label="Notifications"
            >
              <Bell size={18} />
              <i />
            </button>
            <div className="top-divider" />
            <button className="help-button">
              <CircleHelp size={16} /> Help
            </button>
          </div>
        </header>

        <div className="page-content">
          <div className="page-heading">
            <div>
              <div className="eyebrow">
                <span className="live-dot" /> YOUR BUSINESS AT A GLANCE
              </div>
              <h1>
                {isOverview ? "Good afternoon" : activePage}
                <span className="heading-period">{isOverview ? ", " : ""}</span>
                {isOverview && <span className="wave">✳</span>}
              </h1>
              <p className="page-description">
                {isOverview
                  ? "Here's what's happening with your store today."
                  : `${activePage} insights for your Northstar Goods demo workspace.`}
              </p>
            </div>
            <div className="heading-actions">
              <button
                className="button-secondary"
                onClick={() =>
                  window.alert(
                    "Demo export: connect the analytics API in a future milestone.",
                  )
                }
              >
                <Download size={16} /> Export
              </button>
              <button
                className="button-primary"
                onClick={() => setActivePage("Data sources")}
              >
                <Upload size={16} /> Import data
              </button>
            </div>
          </div>

          <div className="demo-banner">
            <div className="demo-banner-icon">
              <Sparkles size={17} />
            </div>
            <div>
              <strong>Exploring the demo workspace</strong>
              <span>
                These sample metrics illustrate the experience. Import your
                store data when the data pipeline is ready.
              </span>
            </div>
            <button onClick={() => setActivePage("Data sources")}>
              Explore data sources <span>→</span>
            </button>
          </div>

          <section className="section-block">
            <div className="section-heading">
              <div>
                <h2>Performance overview</h2>
                <p>Your store's key metrics, all in one place.</p>
              </div>
              <button
                className="filter-button"
                onClick={() =>
                  setPeriod(
                    period === "7D" ? "30D" : period === "30D" ? "90D" : "7D",
                  )
                }
              >
                <span className="filter-dot" /> Last{" "}
                {period === "7D"
                  ? "7 days"
                  : period === "30D"
                    ? "30 days"
                    : "90 days"}{" "}
                <ChevronDown size={15} />
              </button>
            </div>

            <div className="metric-grid">
              <MetricCard
                title="Total revenue"
                value={
                  period === "7D"
                    ? "$46,820"
                    : period === "30D"
                      ? "$128,430"
                      : "$348,290"
                }
                change="+12.8%"
                positive
                subtitle="vs. previous period"
                icon={<Wallet size={18} />}
                iconClass="green"
              />
              <MetricCard
                title="Total orders"
                value={
                  period === "7D" ? "842" : period === "30D" ? "2,846" : "7,924"
                }
                change="+8.2%"
                positive
                subtitle="vs. previous period"
                icon={<ShoppingBag size={18} />}
                iconClass="blue"
              />
              <MetricCard
                title="Average order value"
                value={
                  period === "7D"
                    ? "$55.60"
                    : period === "30D"
                      ? "$45.13"
                      : "$43.95"
                }
                change="+4.3%"
                positive
                subtitle="vs. previous period"
                icon={<Command size={18} />}
                iconClass="purple"
              />
              <MetricCard
                title="Returning customers"
                value={
                  period === "7D"
                    ? "28.4%"
                    : period === "30D"
                      ? "32.8%"
                      : "35.1%"
                }
                change="−1.6%"
                positive={false}
                subtitle="vs. previous period"
                icon={<Users size={18} />}
                iconClass="orange"
              />
            </div>
          </section>

          <section className="analytics-grid">
            <div className="panel revenue-panel">
              <div className="panel-heading">
                <div>
                  <h2>Revenue over time</h2>
                  <p>Track sales performance against the previous period.</p>
                </div>
                <button
                  className="icon-button panel-menu"
                  aria-label="Chart options"
                >
                  ···
                </button>
              </div>
              <div className="chart-summary">
                <div>
                  <strong>
                    {period === "7D"
                      ? "$46,820"
                      : period === "30D"
                        ? "$128,430"
                        : "$348,290"}
                  </strong>
                  <span className="growth-pill">
                    <ArrowUpRight size={14} /> 12.8%
                  </span>
                </div>
                <span className="chart-summary-caption">Revenue · USD</span>
              </div>
              <div className="chart-legend">
                <span>
                  <i className="legend-current" /> This period
                </span>
                <span>
                  <i className="legend-previous" /> Previous period
                </span>
              </div>
              <div className="chart-wrap">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData[period]}
                    margin={{ top: 12, right: 8, left: -14, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="revenueGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#55D69A"
                          stopOpacity={0.23}
                        />
                        <stop
                          offset="95%"
                          stopColor="#55D69A"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      stroke="#262A30"
                      strokeDasharray="3 5"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="date"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#858B96", fontSize: 11 }}
                      dy={12}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#858B96", fontSize: 11 }}
                      tickFormatter={(value) =>
                        `$${value >= 1000 ? `${value / 1000}k` : value}`
                      }
                    />
                    <Tooltip
                      contentStyle={{
                        background: "#1A1D22",
                        border: "1px solid #343941",
                        borderRadius: 10,
                        color: "#F4F5F7",
                        fontSize: 12,
                      }}
                      formatter={(value) => [
                        `$${Number(value).toLocaleString()}`,
                        "",
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="previous"
                      stroke="#626B79"
                      strokeWidth={1.8}
                      strokeDasharray="5 5"
                      fill="transparent"
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#55D69A"
                      strokeWidth={2.5}
                      fill="url(#revenueGradient)"
                      activeDot={{
                        r: 5,
                        fill: "#55D69A",
                        stroke: "#14251E",
                        strokeWidth: 3,
                      }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="chart-footer">
                <span>
                  <span className="footer-dot" /> Revenue is trending upward
                </span>
                <span>Illustrative sample data</span>
              </div>
            </div>

            <div className="panel insights-panel">
              <div className="ai-panel-heading">
                <div className="ai-icon">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h2>Pulse intelligence</h2>
                  <p>Your AI business co-pilot</p>
                </div>
                <span className="beta-badge">PREVIEW</span>
              </div>
              <div className="insight-highlight">
                <div className="insight-type">
                  <Sparkles size={13} /> KEY OBSERVATION
                </div>
                <h3>Your best sellers are gaining momentum.</h3>
                <p>
                  Footwear leads the sample catalog, with Everyday Sneakers
                  showing the highest listed revenue among the products below.
                </p>
                <div className="insight-stat">
                  <span className="insight-stat-icon">
                    <ArrowUpRight size={17} />
                  </span>
                  <div>
                    <strong>+18.6%</strong>
                    <small>Sample product revenue change</small>
                  </div>
                </div>
              </div>
              <div className="insight-divider" />
              <div className="suggestion-heading">ASK YOUR BUSINESS</div>
              <div className="suggestion-list">
                {[
                  "Which products perform best?",
                  "How is my revenue trending?",
                  "What should I investigate next?",
                ].map((q) => (
                  <button
                    key={q}
                    className="suggestion-chip"
                    onClick={() => {
                      setQuestion(q);
                      setShowAnswer(true);
                    }}
                  >
                    {q}
                    <span>↗</span>
                  </button>
                ))}
              </div>
              {showAnswer && (
                <div className="demo-answer">
                  <Sparkles size={14} />
                  <span>
                    <strong>Demo response</strong>
                    <br />
                    {question === "Which products perform best?"
                      ? "Everyday Sneakers leads this sample table with $38,520 in revenue."
                      : question === "How is my revenue trending?"
                        ? "The illustrative overview shows revenue up 12.8% versus the previous period."
                        : "Review product margins, compare periods, and validate the sample trends with your actual store data."}{" "}
                    This answer uses illustrative demo metrics, not a live AI
                    model.
                  </span>
                </div>
              )}
              <form
                className="ai-input"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (question.trim()) setShowAnswer(true);
                }}
              >
                <input
                  aria-label="Ask about your store"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask anything about your store..."
                />
                <button type="submit" aria-label="Ask AI">
                  <ArrowUpRight size={18} />
                </button>
              </form>
              <div className="ai-footnote">
                <span className="tiny-sparkle">✳</span> AI responses will be
                connected in a later milestone.
              </div>
            </div>
          </section>

          <section className="panel products-panel">
            <div className="panel-heading products-heading">
              <div>
                <h2>Top performing products</h2>
                <p>See what's driving your store's revenue.</p>
              </div>
              <button
                className="text-link"
                onClick={() => setActivePage("Products")}
              >
                View all products <span>→</span>
              </button>
            </div>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>PRODUCT</th>
                    <th>UNITS SOLD</th>
                    <th>REVENUE</th>
                    <th>GROWTH</th>
                    <th>
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.name}>
                      <td>
                        <div className="product-cell">
                          <div className={`product-thumb ${product.color}`}>
                            {product.initials}
                          </div>
                          <div>
                            <strong>{product.name}</strong>
                            <small>{product.category}</small>
                          </div>
                        </div>
                      </td>
                      <td className="numeric-cell">{product.sales}</td>
                      <td className="numeric-cell revenue-cell">
                        {product.revenue}
                      </td>
                      <td>
                        <span className="table-growth">
                          <ArrowUpRight size={13} />
                          {product.change}
                        </span>
                      </td>
                      <td>
                        <button
                          className="row-menu"
                          aria-label={`More options for ${product.name}`}
                        >
                          ···
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="table-footer">
              <span>
                Showing <strong>4</strong> sample products
              </span>
              <button onClick={() => setActivePage("Products")}>
                Explore product analytics <span>→</span>
              </button>
            </div>
          </section>

          <footer className="page-footer">
            <span>
              © 2026 MarketPulse AI <span className="footer-separator">·</span>{" "}
              Built for better business decisions.
            </span>
            <span>
              <i /> Demo workspace <span className="footer-separator">·</span>{" "}
              v0.1.0
            </span>
          </footer>
        </div>
      </main>
    </div>
  );
}

function MetricCard({
  title,
  value,
  change,
  positive,
  subtitle,
  icon,
  iconClass,
}: {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  subtitle: string;
  icon: React.ReactNode;
  iconClass: string;
}) {
  return (
    <article className="metric-card">
      <div className="metric-top">
        <span>{title}</span>
        <span className={`metric-icon ${iconClass}`}>{icon}</span>
      </div>
      <div className="metric-value">{value}</div>
      <div className="metric-bottom">
        <span className={`metric-change ${positive ? "positive" : "negative"}`}>
          {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {change}
        </span>
        <span className="metric-subtitle">{subtitle}</span>
      </div>
    </article>
  );
}

export default App;
