const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle,
  Header, Footer, PageNumber, PageBreak, LevelFormat, convertInchesToTwip,
  VerticalAlign, TableLayoutType
} = require("docx");
const fs = require("fs");

// Palette
const NAVY = "1B2A4A";
const TEAL = "0F6E6A";
const GOLD = "C9932F";
const LIGHT_BG = "F2F5F7";
const SLIDE_BG = "EFF6F5";
const GREY = "595959";
const LIGHT_RULE = "D9DEE4";

const FONT = "Calibri";

function scriptPara(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 120, line: 300 },
    children: [
      new TextRun({ text, font: FONT, size: 22, color: "232323", italics: true }),
    ],
  });
}

function bodyPara(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 100, line: 276 },
    children: [new TextRun({ text, font: FONT, size: 22, color: "232323" })],
  });
}

function labelRun(text) {
  return new TextRun({ text, font: FONT, size: 20, bold: true, color: TEAL, allCaps: true });
}

function slideBox(title, lines) {
  // Shaded box representing on-screen slide content
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { fill: SLIDE_BG, type: ShadingType.CLEAR, color: "auto" },
            margins: { top: 160, bottom: 160, left: 220, right: 220 },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 4, color: TEAL },
              bottom: { style: BorderStyle.SINGLE, size: 4, color: TEAL },
              left: { style: BorderStyle.SINGLE, size: 4, color: TEAL },
              right: { style: BorderStyle.SINGLE, size: 4, color: TEAL },
            },
            children: [
              new Paragraph({
                spacing: { after: 80 },
                children: [
                  new TextRun({ text: "ON SCREEN — ", font: FONT, size: 18, bold: true, color: TEAL }),
                  new TextRun({ text: title, font: FONT, size: 18, bold: true, color: NAVY }),
                ],
              }),
              ...lines.map((l, i) => new Paragraph({
                spacing: { after: i === lines.length - 1 ? 0 : 40 },
                children: [new TextRun({ text: "•  " + l, font: FONT, size: 20, color: "2B2B2B" })],
              })),
            ],
          }),
        ],
      }),
    ],
  });
}

function transitionBox(text) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" },
            margins: { top: 120, bottom: 120, left: 220, right: 160 },
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
              left: { style: BorderStyle.SINGLE, size: 24, color: GOLD },
            },
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: "HAND-OFF  ", font: FONT, size: 18, bold: true, color: GOLD }),
                  new TextRun({ text: text, font: FONT, size: 21, italics: true, color: "3A3A3A" }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function speakerHeader(num, name, role, time) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 15, type: WidthType.PERCENTAGE },
            shading: { fill: NAVY, type: ShadingType.CLEAR, color: "auto" },
            verticalAlign: VerticalAlign.CENTER,
            margins: { top: 160, bottom: 160, left: 160, right: 100 },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: "SPEAKER " + num, font: FONT, size: 18, bold: true, color: "FFFFFF" })],
              }),
            ],
          }),
          new TableCell({
            width: { size: 60, type: WidthType.PERCENTAGE },
            shading: { fill: NAVY, type: ShadingType.CLEAR, color: "auto" },
            verticalAlign: VerticalAlign.CENTER,
            margins: { top: 160, bottom: 160, left: 200, right: 100 },
            children: [
              new Paragraph({
                children: [new TextRun({ text: name, font: FONT, size: 26, bold: true, color: "FFFFFF" })],
              }),
              new Paragraph({
                spacing: { before: 20 },
                children: [new TextRun({ text: role, font: FONT, size: 19, color: "CFE0DE", italics: true })],
              }),
            ],
          }),
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            shading: { fill: TEAL, type: ShadingType.CLEAR, color: "auto" },
            verticalAlign: VerticalAlign.CENTER,
            margins: { top: 160, bottom: 160, left: 100, right: 100 },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: "⏱ " + time, font: FONT, size: 20, bold: true, color: "FFFFFF" })],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function slideTag(n, title) {
  return new Paragraph({
    spacing: { before: 200, after: 100 },
    children: [
      new TextRun({ text: "SLIDE " + n + "  ", font: FONT, size: 20, bold: true, color: GOLD }),
      new TextRun({ text: title, font: FONT, size: 20, bold: true, color: NAVY }),
    ],
  });
}

function spacer(h = 120) {
  return new Paragraph({ spacing: { after: h }, children: [] });
}

function sectionHeading(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 100, after: 160 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: LIGHT_RULE, space: 8 } },
    children: [new TextRun({ text, font: FONT, color: NAVY, bold: true })],
  });
}

const doc = new Document({
  styles: {
    default: {
      document: { run: { font: FONT, size: 22, color: "232323" } },
    },
  },
  sections: [
    // COVER PAGE
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
        },
      },
      children: [
        spacer(1400),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "INVESTOR PITCH — SPEAKER GUIDE", font: FONT, size: 22, bold: true, color: TEAL, allCaps: true })],
        }),
        spacer(200),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "SkillPassport AI", font: FONT, size: 60, bold: true, color: NAVY })],
        }),
        spacer(100),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "The Gateway to the Global Developer Ecosystem", font: FONT, size: 26, italics: true, color: GREY })],
        }),
        spacer(500),
        new Table({
          width: { size: 70, type: WidthType.PERCENTAGE },
          alignment: AlignmentType.CENTER,
          layout: TableLayoutType.FIXED,
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  shading: { fill: LIGHT_BG, type: ShadingType.CLEAR, color: "auto" },
                  margins: { top: 240, bottom: 240, left: 300, right: 300 },
                  borders: {
                    top: { style: BorderStyle.SINGLE, size: 4, color: LIGHT_RULE },
                    bottom: { style: BorderStyle.SINGLE, size: 4, color: LIGHT_RULE },
                    left: { style: BorderStyle.SINGLE, size: 4, color: LIGHT_RULE },
                    right: { style: BorderStyle.SINGLE, size: 4, color: LIGHT_RULE },
                  },
                  children: [
                    new Paragraph({
                      alignment: AlignmentType.CENTER,
                      spacing: { after: 120 },
                      children: [
                        new TextRun({ text: "DURATION   ", font: FONT, size: 20, bold: true, color: NAVY }),
                        new TextRun({ text: "12–15 minutes", font: FONT, size: 20, color: "2B2B2B" }),
                      ],
                    }),
                    new Paragraph({
                      alignment: AlignmentType.CENTER,
                      children: [
                        new TextRun({ text: "THEME   ", font: FONT, size: 20, bold: true, color: NAVY }),
                        new TextRun({ text: "\u201cBuilding the Trust Infrastructure for the Global Developer Economy\u201d", font: FONT, size: 20, italics: true, color: "2B2B2B" }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        spacer(500),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "PRESENTATION FLOW", font: FONT, size: 18, bold: true, color: GOLD, allCaps: true })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100 },
          children: [new TextRun({ text: "Hook  →  Problem  →  Solution  →  Business  →  Vision  →  Investment", font: FONT, size: 24, bold: true, color: NAVY })],
        }),
      ],
    },

    // MAIN CONTENT
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1080, bottom: 1080, left: 1080, right: 1080 },
        },
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: LIGHT_RULE, space: 4 } },
              children: [new TextRun({ text: "SkillPassport AI  ·  Speaker Guide", font: FONT, size: 16, color: GREY })],
            }),
          ],
        }),
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: "Page ", font: FONT, size: 16, color: GREY }),
                new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 16, color: GREY }),
              ],
            }),
          ],
        }),
      },
      children: [
        sectionHeading("Timing Overview"),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          columnWidths: [1900, 3800, 1900, 1500],
          layout: TableLayoutType.FIXED,
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                headCell("Speaker", 1900),
                headCell("Segment", 3800),
                headCell("Slides", 1900),
                headCell("Time", 1500),
              ],
            }),
            timingRow("Chandana M N", "Introduction & Hook", "1", "2 min"),
            timingRow("Chandrashekar V", "Problem Statement", "2 – 3", "2.5 min"),
            timingRow("Chetana", "Solution & Core Idea", "4 – 5", "3 min"),
            timingRow("Pavitra J", "Value Proposition & Market", "6 – 8", "3 min"),
            timingRow("Lohith R C", "Vision, Closing & Investment Ask", "9 – 10", "3–4 min"),
          ],
        }),
        new Paragraph({ children: [new PageBreak()] }),

        // SPEAKER 1
        speakerHeader("1", "Chandana M N", "Introduction & Hook", "2 min"),
        spacer(160),
        slideTag("1", "Title — SkillPassport AI"),
        slideBox("Slide 1", [
          "SkillPassport AI",
          "The Gateway to the Global Developer Ecosystem",
          "Visual: a developer surrounded by GitHub, LinkedIn, AWS, LeetCode, universities, companies, and investors — all disconnected",
        ]),
        spacer(160),
        new Paragraph({ children: [labelRun("Script")], spacing: { after: 80 } }),
        scriptPara("Good morning, respected investors, mentors, and everyone present here."),
        scriptPara("Imagine you're one of the world's best software developers. You have built amazing projects. You contribute to open source. You have solved thousands of coding problems. You have deployed real applications. You have completed internships."),
        scriptPara("But when you apply for a job… you're still asked for one thing… \u2018Please upload your resume.\u2019"),
        scriptPara("Years of work… reduced to a two-page document."),
        bodyPara("Today, every developer's journey is scattered across multiple platforms. GitHub stores code. LinkedIn stores professional history. Coding platforms measure problem-solving. Cloud platforms host projects. Universities maintain academic records. Recruiters manually visit every one of these platforms to understand a single candidate.", {}),
        scriptPara("The problem isn't a lack of talent. The problem is the lack of trust and connection between all these platforms."),
        scriptPara("That's exactly why we created SkillPassport AI."),
        spacer(160),
        transitionBox("\u201cTo understand why this problem is much bigger than recruitment alone, I invite Chandrashekar to explain the current challenges faced by developers and companies.\u201d"),

        new Paragraph({ children: [new PageBreak()] }),

        // SPEAKER 2
        speakerHeader("2", "Chandrashekar V", "Problem Statement", "2.5 min"),
        spacer(160),
        slideTag("2", "The Broken Developer Ecosystem"),
        slideBox("Slide 2", [
          "Large ecosystem visual — disconnected platforms",
        ]),
        spacer(160),
        new Paragraph({ children: [labelRun("Script")], spacing: { after: 80 } }),
        scriptPara("Today's developer ecosystem is highly fragmented."),
        bodyPara("A software engineer uses GitHub for source code. LinkedIn for networking. LeetCode for coding practice. AWS or Vercel for deployment. Separate portfolio websites. Recruitment portals for jobs. Startup platforms for funding."),
        scriptPara("Every platform captures only one part of a developer's professional journey. This fragmentation creates problems for everyone."),
        bodyPara("Developers repeatedly prove their skills on every platform. Companies spend valuable time verifying projects, resumes, coding ability, and technical experience. Universities struggle to showcase the true capabilities of their students. Investors often cannot judge whether startup founders possess the technical skills to execute their ideas."),
        scriptPara("The industry has evolved… but the way we evaluate technical talent has not. We don't have a trusted identity for developers. We only have fragmented pieces."),
        spacer(160),
        slideTag("3", "Problem Summary"),
        problemSummaryTable(),
        spacer(160),
        transitionBox("\u201cSo how do we solve this? Instead of creating another recruitment platform, we decided to build something much bigger. Chetana will now introduce our solution.\u201d"),

        new Paragraph({ children: [new PageBreak()] }),

        // SPEAKER 3
        speakerHeader("3", "Chetana", "Solution & Core Idea", "3 min"),
        spacer(160),
        slideTag("4", "SkillPassport AI — Gateway to the Global Developer Ecosystem"),
        slideBox("Slide 4", ["Visual: everything connected through SkillPassport"]),
        spacer(160),
        new Paragraph({ children: [labelRun("Script")], spacing: { after: 80 } }),
        scriptPara("SkillPassport AI is not another recruitment platform. It is the infrastructure that connects the entire developer ecosystem."),
        scriptPara("Instead of replacing GitHub, LinkedIn, coding platforms, cloud providers, or universities… we connect them."),
        bodyPara("Every verified contribution made by a developer becomes part of one continuously growing professional identity. Every project… every deployment… every internship… every certification… every technical challenge… strengthens the developer's Skill Passport."),
        scriptPara("Companies no longer evaluate resumes alone. They evaluate verified work. Universities showcase industry-ready graduates. Investors discover technically capable founders. Developers build careers instead of simply searching for jobs."),
        spacer(160),
        slideTag("5", "Platform Ecosystem"),
        ecosystemBox(),
        spacer(160),
        new Paragraph({ children: [labelRun("Continue")], spacing: { after: 80 } }),
        scriptPara("Everything we build revolves around one idea… professional identity built through real contributions. Every feature exists for one purpose: to create, strengthen, or utilize a developer's verified identity."),
        spacer(160),
        transitionBox("\u201cNow that you've seen our vision, Pavitra will explain how this translates into real business value and our future roadmap.\u201d"),

        new Paragraph({ children: [new PageBreak()] }),

        // SPEAKER 4
        speakerHeader("4", "Pavitra J", "Value Proposition & Market", "3 min"),
        spacer(160),
        slideTag("6", "Why SkillPassport Wins"),
        new Paragraph({ children: [labelRun("Script")], spacing: { after: 80 } }),
        scriptPara("Our competitive advantage is not one feature. It is the ecosystem."),
        bodyPara("Existing platforms solve one problem. GitHub manages repositories. LinkedIn manages networking. Cloud providers host applications. Recruitment platforms connect jobs."),
        scriptPara("But none of them connects the entire developer journey. SkillPassport becomes the trusted layer connecting all of them."),
        spacer(160),
        slideTag("7", "Future Vision"),
        pillarBox(["Proof of Skill", "Skill Economy", "Time Capsule Portfolio"]),
        spacer(160),
        new Paragraph({ children: [labelRun("Continue")], spacing: { after: 80 } }),
        bodyPara("Our long-term innovations make the platform even stronger. We introduce the Proof of Skill Protocol, where developers earn verifiable professional credibility through real-world work rather than static resumes."),
        bodyPara("We introduce the Skill Economy, where companies publish real engineering problems instead of traditional job descriptions, allowing developers to build careers by continuously solving meaningful challenges."),
        bodyPara("Finally, our Time Capsule Portfolio preserves every verified contribution made throughout a developer's career, allowing recruiters to understand not only what a developer knows today but also how they have evolved over time."),
        spacer(160),
        slideTag("8", "Revenue Streams"),
        revenueTable(),
        spacer(160),
        new Paragraph({ children: [labelRun("Continue")], spacing: { after: 80 } }),
        scriptPara("Our business model is diversified, creating multiple recurring revenue streams while ensuring that every participant in the ecosystem benefits from the platform's growth."),
        spacer(160),
        transitionBox("\u201cFinally, I'd like to invite Lohith to conclude our vision and explain why we believe SkillPassport AI represents the future of technical talent.\u201d"),

        new Paragraph({ children: [new PageBreak()] }),

        // SPEAKER 5
        speakerHeader("5", "Lohith R C", "Vision • Closing • Investment Ask", "3–4 min"),
        spacer(160),
        slideTag("9", "Future"),
        new Paragraph({ children: [labelRun("Script")], spacing: { after: 80 } }),
        scriptPara("Technology has changed the way software is built. But it has not changed the way technical talent is trusted."),
        scriptPara("We believe the future belongs to verified professional identity."),
        bodyPara("Just as GitHub became the home of source code… LinkedIn became the home of professional networking… we envision SkillPassport becoming the trusted identity for technical talent across the world."),
        spacer(160),
        slideTag("10", "Vision"),
        pillarBox(["One Identity", "One Ecosystem", "Unlimited Opportunities"]),
        spacer(160),
        new Paragraph({ children: [labelRun("Continue")], spacing: { after: 80 } }),
        scriptPara("We are not building another recruitment platform. We are building the infrastructure for the global developer economy."),
        bodyPara("Where developers build. Companies discover. Universities validate. Investors connect. Cloud providers empower innovation. Every project. Every contribution. Every deployment. Every achievement. Becomes a trusted opportunity."),
        spacer(160),
        new Paragraph({ children: [labelRun("Investment Ask")], spacing: { after: 80 } }),
        scriptPara("Today, we are seeking strategic partners and investment to build the first phase of SkillPassport AI."),
        bodyPara("Our initial focus is simple: build the trusted identity layer for developers. Validate it with companies. Then expand into the broader ecosystem."),
        scriptPara("We are not asking you to invest in another recruitment platform. We are inviting you to invest in the future infrastructure of technical talent."),
        spacer(160),
        closingLineBox("Because in the future, people won't trust resumes. They'll trust Proof of Skill. Thank you."),

        new Paragraph({ children: [new PageBreak()] }),

        sectionHeading("Recommended Slide Deck (10 Slides)"),
        slideListTable(),

        spacer(300),
        sectionHeading("Before You Present: Anticipate the Toughest Question"),
        bodyPara("If these are experienced investors, expect the toughest question to be:"),
        new Paragraph({
          spacing: { after: 160 },
          children: [new TextRun({ text: "\u201cWhat are you building first?\u201d", font: FONT, size: 24, italics: true, bold: true, color: NAVY })],
        }),
        bodyPara("Don't answer with the full ecosystem. Instead, say:"),
        adviceBox("Our Phase 1 focuses on a verified developer identity platform with project verification, Proof of Skill foundations, and recruiter discovery. The broader ecosystem — Skill Economy, Time Capsule, cloud marketplace, and startup network — is our long-term roadmap."),
        spacer(120),
        bodyPara("That answer shows discipline. Investors generally prefer founders who can clearly distinguish between the MVP and the 10-year vision."),
      ],
    },
  ],
});

function headCell(text, w) {
  return new TableCell({
    width: { size: w, type: WidthType.DXA },
    shading: { fill: NAVY, type: ShadingType.CLEAR, color: "auto" },
    margins: { top: 100, bottom: 100, left: 120, right: 120 },
    children: [new Paragraph({ children: [new TextRun({ text, font: FONT, size: 19, bold: true, color: "FFFFFF" })] })],
  });
}

function timingRow(speaker, segment, slides, time) {
  return new TableRow({
    children: [
      dataCell(speaker, 2000, true),
      dataCell(segment, 4000, false),
      dataCell(slides, 2500, false),
      dataCell(time, 1500, false),
    ],
  });
}

function dataCell(text, w, bold) {
  return new TableCell({
    width: { size: w, type: WidthType.DXA },
    margins: { top: 90, bottom: 90, left: 120, right: 120 },
    shading: { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 2, color: LIGHT_RULE },
      bottom: { style: BorderStyle.SINGLE, size: 2, color: LIGHT_RULE },
      left: { style: BorderStyle.SINGLE, size: 2, color: LIGHT_RULE },
      right: { style: BorderStyle.SINGLE, size: 2, color: LIGHT_RULE },
    },
    children: [new Paragraph({ children: [new TextRun({ text, font: FONT, size: 20, bold: !!bold, color: "232323" })] })],
  });
}

function problemSummaryTable() {
  const groups = [
    { who: "Developer", pains: ["Multiple Profiles", "Multiple Portfolios", "Multiple Verifications"] },
    { who: "Company", pains: ["Resume Screening", "Manual Verification", "Hiring Delays"] },
    { who: "University", pains: ["Limited Visibility"] },
    { who: "Investor", pains: ["No Technical Trust Layer"] },
  ];
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
    rows: groups.map((g) => new TableRow({
      children: [
        new TableCell({
          width: { size: 2200, type: WidthType.DXA },
          shading: { fill: LIGHT_BG, type: ShadingType.CLEAR, color: "auto" },
          verticalAlign: VerticalAlign.CENTER,
          margins: { top: 100, bottom: 100, left: 140, right: 100 },
          borders: allBorders(),
          children: [new Paragraph({ children: [new TextRun({ text: g.who, font: FONT, size: 20, bold: true, color: NAVY })] })],
        }),
        new TableCell({
          width: { size: 7800, type: WidthType.DXA },
          margins: { top: 100, bottom: 100, left: 140, right: 100 },
          borders: allBorders(),
          children: g.pains.map((p, i) => new Paragraph({
            spacing: { after: i === g.pains.length - 1 ? 0 : 40 },
            children: [
              new TextRun({ text: "✗  ", font: FONT, size: 20, bold: true, color: "B23A48" }),
              new TextRun({ text: p, font: FONT, size: 20, color: "2B2B2B" }),
            ],
          })),
        }),
      ],
    })),
  });
}

function allBorders() {
  return {
    top: { style: BorderStyle.SINGLE, size: 2, color: LIGHT_RULE },
    bottom: { style: BorderStyle.SINGLE, size: 2, color: LIGHT_RULE },
    left: { style: BorderStyle.SINGLE, size: 2, color: LIGHT_RULE },
    right: { style: BorderStyle.SINGLE, size: 2, color: LIGHT_RULE },
  };
}

function ecosystemBox() {
  const items = ["Developers", "Companies", "Universities", "Investors", "Cloud Providers", "Mentors"];
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { fill: NAVY, type: ShadingType.CLEAR, color: "auto" },
            margins: { top: 200, bottom: 200, left: 220, right: 220 },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 140 },
                children: [new TextRun({ text: "SkillPassport AI", font: FONT, size: 24, bold: true, color: "FFFFFF" })],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: items.join("   ·   "), font: FONT, size: 19, color: "CFE0DE" })],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function pillarBox(items) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
    rows: [
      new TableRow({
        children: items.map((it) => new TableCell({
          width: { size: Math.floor(9000 / items.length), type: WidthType.DXA },
          shading: { fill: SLIDE_BG, type: ShadingType.CLEAR, color: "auto" },
          verticalAlign: VerticalAlign.CENTER,
          margins: { top: 180, bottom: 180, left: 120, right: 120 },
          borders: {
            top: { style: BorderStyle.SINGLE, size: 4, color: TEAL },
            bottom: { style: BorderStyle.SINGLE, size: 4, color: TEAL },
            left: { style: BorderStyle.SINGLE, size: 4, color: TEAL },
            right: { style: BorderStyle.SINGLE, size: 4, color: TEAL },
          },
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: it, font: FONT, size: 21, bold: true, color: NAVY })] })],
        })),
      }),
    ],
  });
}

function revenueTable() {
  const streams = ["Enterprise Recruitment", "Premium Developer Plans", "Marketplace Commission", "University Partnerships", "Cloud Marketplace", "Sponsored Challenges"];
  const rows = [];
  for (let i = 0; i < streams.length; i += 2) {
    rows.push(new TableRow({
      children: [
        revCell(streams[i]),
        revCell(streams[i + 1] || ""),
      ],
    }));
  }
  return new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, layout: TableLayoutType.FIXED, rows });
}

function revCell(text) {
  return new TableCell({
    width: { size: 4500, type: WidthType.DXA },
    margins: { top: 100, bottom: 100, left: 160, right: 100 },
    borders: allBorders(),
    shading: { fill: text ? "FFFFFF" : "FFFFFF", type: ShadingType.CLEAR, color: "auto" },
    children: [new Paragraph({ children: text ? [
      new TextRun({ text: "$  ", font: FONT, size: 20, bold: true, color: GOLD }),
      new TextRun({ text, font: FONT, size: 20, color: "2B2B2B" }),
    ] : [] })],
  });
}

function slideListTable() {
  const slides = [
    "Title + Hook",
    "Problem",
    "Current Fragmented Ecosystem",
    "Our Solution",
    "Connected Ecosystem Diagram",
    "Why We're Different",
    "Future Vision (PoS, Skill Economy, Time Capsule)",
    "Business Model & Roadmap",
    "Vision & Investment Ask",
    "Thank You / Q&A",
  ];
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: [900, 8100],
    layout: TableLayoutType.FIXED,
    rows: slides.map((s, i) => new TableRow({
      children: [
        new TableCell({
          width: { size: 900, type: WidthType.DXA },
          shading: { fill: NAVY, type: ShadingType.CLEAR, color: "auto" },
          verticalAlign: VerticalAlign.CENTER,
          margins: { top: 90, bottom: 90, left: 100, right: 100 },
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: String(i + 1), font: FONT, size: 20, bold: true, color: "FFFFFF" })] })],
        }),
        new TableCell({
          width: { size: 8100, type: WidthType.DXA },
          verticalAlign: VerticalAlign.CENTER,
          borders: allBorders(),
          margins: { top: 90, bottom: 90, left: 160, right: 100 },
          children: [new Paragraph({ children: [new TextRun({ text: s, font: FONT, size: 21, color: "232323" })] })],
        }),
      ],
    })),
  });
}

function closingLineBox(text) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { fill: NAVY, type: ShadingType.CLEAR, color: "auto" },
            margins: { top: 240, bottom: 240, left: 260, right: 260 },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 60 },
                children: [new TextRun({ text: "FINAL LINE — PAUSE BEFORE SAYING", font: FONT, size: 16, bold: true, color: GOLD, allCaps: true })],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: "\u201c" + text + "\u201d", font: FONT, size: 24, italics: true, bold: true, color: "FFFFFF" })],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function adviceBox(text) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { fill: LIGHT_BG, type: ShadingType.CLEAR, color: "auto" },
            margins: { top: 180, bottom: 180, left: 220, right: 220 },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 4, color: GOLD },
              bottom: { style: BorderStyle.SINGLE, size: 4, color: GOLD },
              left: { style: BorderStyle.SINGLE, size: 4, color: GOLD },
              right: { style: BorderStyle.SINGLE, size: 4, color: GOLD },
            },
            children: [new Paragraph({ children: [new TextRun({ text: "\u201c" + text + "\u201d", font: FONT, size: 21, italics: true, color: "232323" })] })],
          }),
        ],
      }),
    ],
  });
}

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync("C:/Users/lohit/OneDrive/Desktop/SkillPassport_AI_Speaker_Guide.docx", buf);
  console.log("done");
});