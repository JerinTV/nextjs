"use client";

import "@ant-design/v5-patch-for-react-19";
import {
  AppstoreOutlined,
  ArrowLeftOutlined,
  BellOutlined,
  CalendarOutlined,
  CheckOutlined,
  CloudUploadOutlined,
  CustomerServiceOutlined,
  FileDoneOutlined,
  FileTextOutlined,
  GiftOutlined,
  IdcardOutlined,
  MenuFoldOutlined,
  MoreOutlined,
  PlusOutlined,
  ProfileOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  SolutionOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Avatar, Button, ConfigProvider, Input, Select } from "antd";
import { useMemo, useState } from "react";

type Screen = "list" | "upload" | "uploaded" | "signatoryForm" | "signatoryList";

const plum = "#5b1f3f";

const navItems = [
  ["Dashboard", AppstoreOutlined],
  ["My cases", ProfileOutlined],
  ["Certified True Copy", FileDoneOutlined],
  ["eSign", SolutionOutlined],
  ["Notarise", IdcardOutlined],
  ["Alerts", BellOutlined],
  ["Timeline", UnorderedListOutlined],
  ["Settings", SettingOutlined],
  ["More Options", AppstoreOutlined],
] as const;

const requests = [
  ["Notarisation #1", "02", "7 Sept, 11:00 AM - 11:30 AM", "Session held on 20 Aug", "completed"],
  ["Notarisation #2", "01", "---/---", "", "action pending"],
  ["Notarisation #3", "04", "Today, 4:00 PM", "", "meeting available"],
  ["Notarisation #6", "02", "7 Sept, 11:00 AM | Sessio...", "", "partially completed"],
  ["Notarisation #7", "02", "15 Aug, 2:30 PM (Missed)", "", "rejected"],
  ["Notarisation #8", "02", "7 Sept, 11:00 AM", "Link will be active 10 mins before.", "upcoming"],
] as const;

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brandRow">
        <img className="brandMark" src="/assets/court-click-logo.png" alt="Court Click logo" />
        <div className="brand">court click</div>
        <MenuFoldOutlined className="collapseIcon" />
      </div>
      <div className="sideLine" />
      <nav className="navList">
        {navItems.map(([label, Icon]) => (
          <div className={`navItem ${label === "Notarise" ? "active" : ""}`} key={label}>
            <span className="navIcon">
              <Icon />
            </span>
            <span>{label}</span>
            {label === "My cases" && <span className="caseBadge">04</span>}
          </div>
        ))}
      </nav>
      <div className="sidebarBottom">
        <div className="referCard">
          <div className="referTop">
            <span className="referIcon">
              <GiftOutlined />
            </span>
            <strong>Refer & Earn</strong>
          </div>
          <p>Bring your contacts to CourtClick. Earn up to ₹60,000!</p>
          <button>Refer Now</button>
        </div>
        <div className="contactHelp">
          <QuestionCircleOutlined />
          <strong>Need help? Contact Us</strong>
        </div>
      </div>
    </aside>
  );
}

function TopBar({
  screen,
  setScreen,
}: {
  screen: Screen;
  setScreen: (screen: Screen) => void;
}) {
  const isList = screen === "list";

  return (
    <header className="topbar">
      <div className="titleBlock">
        <button className="backBtn" onClick={() => (isList ? undefined : setScreen("list"))}>
          <ArrowLeftOutlined />
        </button>
        <div>
          <h1>{isList ? "Notarise Document" : "Notarise New Document"}</h1>
          <p>{isList ? "Upload your document and get it notarised digitally" : "Begin the notarisation process for a new document"}</p>
        </div>
      </div>
      <div className="topActions">
        <span>
          <IdcardOutlined /> Instructions
        </span>
        <span>
          <CustomerServiceOutlined /> Need help?
        </span>
        <span className="bellWrap">
          <BellOutlined className="bell" />
        </span>
        <Avatar src="/assets/profile-avatar.png" size={48} />
      </div>
    </header>
  );
}

function Stepper({ screen }: { screen: Screen }) {
  const active = screen === "signatoryForm" || screen === "signatoryList" ? 1 : 0;
  const done = screen === "uploaded" || screen === "signatoryForm" || screen === "signatoryList";
  const signDone = screen === "signatoryList";
  const steps = ["Documents", "Signatory Details", "Book Slot"];

  return (
    <div className="stepBar">
      {steps.map((label, index) => {
        const complete = index === 0 ? done : index === 1 ? signDone : false;
        const current = index === active;
        return (
          <div className="stepItem" key={label}>
            <span className={`stepDot ${complete ? "complete" : ""} ${current ? "current" : ""}`}>{complete ? <CheckOutlined /> : ""}</span>
            {index < steps.length - 1 && <span className="stepLine" />}
            <span className={`stepLabel ${current || complete ? "bold" : ""}`}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}

function ListScreen({ setScreen }: { setScreen: (screen: Screen) => void }) {
  return (
    <main className="content listContent">
      <div className="filtersRow">
        <div className="chips">
          {["All", "Drafts", "Upcoming", "Completed", "Partially Completed", "Failed"].map((chip) => (
            <button className={chip === "All" ? "chip active" : "chip"} key={chip}>
              {chip}
            </button>
          ))}
        </div>
        <Button className="primaryBtn" icon={<PlusOutlined />} onClick={() => setScreen("upload")}>
          New Notarise
        </Button>
      </div>
      <div className="table">
        <div className="tableHead">
          <span>Request Name</span>
          <span>Documents</span>
          <span>Initiated On</span>
          <span>Slot</span>
          <span>Status</span>
          <span />
        </div>
        {requests.map(([name, docs, slot, note, status]) => (
          <div className="tableRow" key={name}>
            <strong>{name}</strong>
            <span>{docs}</span>
            <span className="dateCell">
              <span className="dateIcon">
                <CalendarOutlined />
              </span>
              25 Aug 2025
            </span>
            <span className="slotCell">
              {slot}
              {note && <small>{note}</small>}
            </span>
            <span className={`status ${status.replaceAll(" ", "-")}`}>{status === "meeting available" && <i />} {status.toUpperCase()}</span>
            <span className="rowActions">
              <Button className="viewBtn">{status === "meeting available" ? "Join Meeting" : "View"}</Button>
              {status !== "meeting available" ? <MoreOutlined /> : <span className="actionSpacer" />}
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}

function UploadScreen({ screen, setScreen }: { screen: Screen; setScreen: (screen: Screen) => void }) {
  const uploaded = screen === "uploaded";

  return (
    <>
      <Stepper screen={screen} />
      <main className="content formContent">
        <label className="fieldLabel">Request Name (Give a title to identify this request)<b>*</b></label>
        <Input className="requestInput" defaultValue="Aadhaar Notarise" />
        <button className="uploadBox" onClick={() => setScreen("uploaded")}>
          {uploaded ? (
            <>
              <div className="fileCard">
                <span className="pdfIcon">
                  <span className="pdfSheet">
                    <FileTextOutlined />
                    <b>PDF</b>
                  </span>
                  <span className="pdfTag">PDF</span>
                </span>
                <div>
                  <strong>Aadhaar</strong>
                  <p>15/03/2023 | 6:30 AM | PDF</p>
                </div>
                <MoreOutlined />
              </div>
              <div className="addMore">
                <span>
                  <PlusOutlined />
                </span>
                <strong>Add More</strong>
              </div>
            </>
          ) : (
            <div className="uploadPrompt">
              <span>
                <PlusOutlined />
              </span>
              <div>
                <strong>Upload File</strong>
                <p>Import or Drag and Drop the document you want to notarise</p>
                <p>Supported File Types are .png, .jpeg, .pdf, .csv</p>
              </div>
            </div>
          )}
        </button>
      </main>
      <FooterActions
        primary="Continue"
        disabled={!uploaded}
        onPrimary={() => {
          if (uploaded) setScreen("signatoryForm");
        }}
        onCancel={() => setScreen("list")}
      />
    </>
  );
}

function SignatoryForm({ setScreen }: { setScreen: (screen: Screen) => void }) {
  return (
    <>
      <Stepper screen="signatoryForm" />
      <main className="content formContent signForm">
        <h2>Add Signatory Details</h2>
        <p className="muted">Enter details of signatories.</p>
        <div className="signGrid">
          <div>
            <label className="fieldLabel">Signatory Name (Name of the litigant who will eSign)<b>*</b></label>
            <Select className="selectLike" placeholder="Enter/Choose Client's Name" />
          </div>
          <div>
            <label className="fieldLabel">Signatory Phone Number<b>*</b></label>
            <Input className="requestInput phoneInput" prefix={<span className="flag"><span className="indiaFlag" /><span>+91</span><span className="prefixArrow">⌄</span></span>} />
          </div>
          <div>
            <label className="fieldLabel">Signatory Email Address<b>*</b></label>
            <Input className="requestInput" placeholder="Enter Email" />
          </div>
        </div>
        <label className="fieldLabel uploadLabel">Upload Aadhaar Proof</label>
        <div className="proofRow">
          <button>
            <CloudUploadOutlined />
            Front View
          </button>
          <button>
            <CloudUploadOutlined />
            Back View
          </button>
        </div>
        <p className="note"><strong>Note:</strong> Add Aadhaar here, or let the signatory upload it before the session.</p>
      </main>
      <FooterActions primary="Book Slot" disabled onPrimary={() => setScreen("signatoryList")} onCancel={() => setScreen("uploaded")} />
    </>
  );
}

function SignatoryList({ setScreen }: { setScreen: (screen: Screen) => void }) {
  return (
    <>
      <Stepper screen="signatoryList" />
      <main className="content formContent signList">
        <div className="listTop">
          <div>
            <h2>Add Signatory Details</h2>
            <p className="muted">Add the details of the person who needs to sign this document</p>
          </div>
          <Button className="primaryBtn addBtn" icon={<PlusOutlined />} onClick={() => setScreen("signatoryForm")}>
            Add
          </Button>
        </div>
        <div className="personRow">
          {[1, 2].map((item) => (
            <div className="personCard" key={item}>
              <MoreOutlined />
              <strong>Robin D</strong>
              <div>
                <span>9876543210</span>
                <span>robin@gmail.com</span>
              </div>
            </div>
          ))}
        </div>
      </main>
      <FooterActions primary="Book Slot" disabled onCancel={() => setScreen("uploaded")} />
    </>
  );
}

function FooterActions({
  primary,
  disabled,
  onPrimary,
  onCancel,
}: {
  primary: string;
  disabled?: boolean;
  onPrimary?: () => void;
  onCancel?: () => void;
}) {
  return (
    <footer className="footerActions">
      <Button className="cancelBtn" onClick={onCancel}>
        Cancel
      </Button>
      <Button className={`continueBtn ${disabled ? "disabled" : ""}`} onClick={onPrimary}>
        {primary}
      </Button>
    </footer>
  );
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("list");

  const body = useMemo(() => {
    if (screen === "list") return <ListScreen setScreen={setScreen} />;
    if (screen === "upload" || screen === "uploaded") return <UploadScreen screen={screen} setScreen={setScreen} />;
    if (screen === "signatoryForm") return <SignatoryForm setScreen={setScreen} />;
    return <SignatoryList setScreen={setScreen} />;
  }, [screen]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: plum,
          borderRadius: 8,
          fontFamily: "var(--font-app), Manrope, Arial, sans-serif",
        },
      }}
    >
      <div className="appShell">
        <Sidebar />
        <section className="mainPanel">
          <TopBar screen={screen} setScreen={setScreen} />
          {body}
        </section>
      </div>
    </ConfigProvider>
  );
}
