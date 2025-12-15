export interface HandbookSection {
  id: string
  title: string
  icon: string
  description: string
  articles: HandbookArticle[]
}

export interface HandbookArticle {
  id: string
  title: string
  content: string
  tags: string[]
}

export const handbookSections: HandbookSection[] = [
  {
    id: "day-1",
    title: "Day 1 Essentials",
    icon: "Sunrise",
    description: "Everything you need to know on your first day",
    articles: [
      {
        id: "clock-in-out",
        title: "How to Clock In & Out",
        content: `**Clocking In**
- Use VelaPOS to clock in at the start of your shift
- You must be in uniform and ready to work before clocking in
- Clock in no more than 5 minutes before your scheduled shift

**Clocking Out**
- Clock out immediately after your shift ends
- Never clock out for another employee
- If you forget to clock in/out, notify your manager immediately

**Breaks**
- Shifts 6+ hours: One 30-minute unpaid break
- Breaks under 20 minutes are paid
- Always clock out for unpaid breaks`,
        tags: ["clock", "time", "breaks", "schedule"],
      },
      {
        id: "dress-code",
        title: "Dress Code Requirements",
        content: `**Required Attire**
- Company-provided black shirt (must be worn at all times)
- Black pants or jeans (no rips, tears, or holes)
- Closed-toe shoes (no sandals or flip-flops)
- Name badge must be visible

**Prohibited Items**
- Hats or head coverings (unless religious)
- Visible offensive tattoos must be covered
- Excessive jewelry that poses safety hazards
- Strong perfumes or colognes

**Clear Bag Policy**
All bags brought into the store must be clear/transparent. This is for security purposes and applies to all employees without exception.`,
        tags: ["dress", "uniform", "clothes", "appearance", "bag"],
      },
      {
        id: "store-keys-alarm",
        title: "Store Keys & Alarm System",
        content: `**Key Holders**
- Only Store Managers and Assistant Managers are key holders
- Keys must never be duplicated or loaned to anyone
- Lost keys must be reported immediately to your District Manager

**Alarm System**
- Each key holder has a unique alarm code
- Never share your alarm code with anyone
- Disarm within 45 seconds of entering to avoid false alarms
- If alarm triggers accidentally, call the alarm company immediately

**Opening the Store**
1. Unlock the door and enter quickly
2. Proceed directly to the alarm panel
3. Enter your unique code to disarm
4. Lock the door behind you until opening time`,
        tags: ["keys", "alarm", "security", "opening", "closing"],
      },
      {
        id: "store-tour",
        title: "Store Layout & Tour",
        content: `**Key Areas to Know**
- **Front Counter**: Main register area, customer service point
- **Display Cases**: Glass products, high-value items (always locked)
- **Back Stock Room**: Inventory storage, receiving area
- **Break Area**: Employee breaks only, keep clean
- **Office**: Manager workspace, safe location

**Safety Equipment Locations**
- Fire extinguisher: Near back exit
- First aid kit: In office or break room
- Panic button: Under each register (know exact location!)

**Restricted Areas**
- Only authorized personnel in the office
- Back stock requires manager approval for non-managers
- Safe access is manager-only`,
        tags: ["store", "layout", "tour", "safety", "location"],
      },
    ],
  },
  {
    id: "daily-operations",
    title: "Daily Operations",
    icon: "Store",
    description: "Opening, closing, and daily procedures",
    articles: [
      {
        id: "opening-procedures",
        title: "Opening Procedures",
        content: `**Before Opening (Arrive 15-30 min early)**
1. Disarm the alarm system
2. Turn on all lights and music
3. Count your opening register drawer ($200)
4. Check the safe and previous night's paperwork
5. Walk the floor - check displays and cleanliness

**Register Preparation**
- Each drawer starts with exactly $200
- Count and verify before signing
- Report any discrepancies immediately

**Store Readiness**
- Ensure all products are stocked and faced
- Check that display cases are locked
- Turn on Open sign at exactly opening time
- Unlock front door for customers`,
        tags: ["opening", "open", "morning", "start", "register"],
      },
      {
        id: "closing-procedures",
        title: "Closing Procedures",
        content: `**End of Night Report (ENR)**
The ENR is completed at the end of every business day. Key sections:
- Opening/Closing counts
- Sales totals
- Deposit information
- Any discrepancies or notes

**Closing Steps**
1. Lock front door at closing time
2. Allow remaining customers to finish shopping
3. Run end-of-day report in VelaPOS
4. Count all registers
5. Complete ENR accurately
6. Secure deposit in safe
7. Turn off lights, music, and displays
8. Set alarm and lock all doors

**Never leave the store without:**
- All registers counted and balanced
- ENR completed and filed
- All doors locked and alarm set`,
        tags: ["closing", "close", "night", "end", "ENR", "deposit"],
      },
      {
        id: "register-operations",
        title: "Register Operations",
        content: `**Drawer Balance**
- Each register maintains a $200 float
- Never remove money except for deposits
- All sales must be rung through the register

**Processing Transactions**
1. Greet the customer
2. Check ID for ALL customers (no exceptions)
3. Scan or enter items
4. Verify total with customer
5. Accept payment
6. Provide receipt
7. Thank the customer

**Payment Types**
- Cash: Count back change to customer
- Card: Follow prompts on terminal
- No personal checks accepted
- Gift cards: Process through VelaPOS`,
        tags: ["register", "cash", "payment", "transaction", "POS"],
      },
      {
        id: "petty-cash",
        title: "Petty Cash & Payouts",
        content: `**Petty Cash**
- Each register has access to $100 petty cash
- Used for small store expenses only
- Every expense requires a receipt
- Log all petty cash use in the petty cash log

**Payouts**
Payouts are used to remove money from the register for specific purposes:
- Bank deposits
- Authorized refunds
- Store supplies (with receipt)

**Process**
1. Get manager approval
2. Process payout in VelaPOS
3. Attach receipt to payout slip
4. File in daily paperwork`,
        tags: ["petty cash", "payout", "expenses", "money"],
      },
    ],
  },
  {
    id: "policies-conduct",
    title: "Policies & Conduct",
    icon: "Shield",
    description: "Workplace rules and expectations",
    articles: [
      {
        id: "drug-alcohol-policy",
        title: "Drug & Alcohol Policy",
        content: `**Zero Tolerance Policy**
High Life maintains a strict drug-free workplace. This includes:

**Prohibited**
- Alcohol consumption before or during work
- Being under the influence of any substance
- CBD, Delta, THC, or Kratom use before/during work
- Possessing prohibited substances on premises

**Important Note**
Even though we sell CBD, Delta, and Kratom products, employees are NOT permitted to use these products before or during their shift. This is for safety and professional reasons.

**Consequences**
- First offense: Immediate termination
- No exceptions will be made

**Nicotine & Tobacco**
- Employees must be 21+ to use nicotine products
- Use only during designated breaks
- Use only in designated smoking areas
- Never in front of customers`,
        tags: ["drug", "alcohol", "substance", "policy", "CBD", "THC", "kratom"],
      },
      {
        id: "attendance-policy",
        title: "Attendance & Call-In Policy",
        content: `**Expectations**
- Arrive on time for every scheduled shift
- Be in uniform and ready to work at shift start
- Consistent attendance is essential

**Calling In**
If you cannot make your shift:
- Call at least 2 HOURS before your shift
- Speak directly with a manager (no texts)
- Provide reason and expected return date
- Find coverage if possible

**No Call/No Show**
- First offense: Written warning
- Second offense: Final warning
- Third offense: Termination

**Tardiness**
- 3 late arrivals = 1 absence
- Pattern of tardiness will result in disciplinary action`,
        tags: ["attendance", "call in", "absent", "late", "tardy", "schedule"],
      },
      {
        id: "electronics-policy",
        title: "Personal Electronics Policy",
        content: `**Cell Phones**
- Personal phones must be kept in your locker or bag
- No cell phone use on the sales floor
- Emergency calls: Step to the back, keep it brief
- Never use phones in front of customers

**Headphones/Earbuds**
- Not permitted during work hours
- This includes one earbud in

**Exceptions**
- Using store tablet for work purposes
- Manager-approved phone use for store business

**Social Media**
- Do not post about work on personal social media
- No photos or videos inside the store
- Company social media is handled by corporate only
- Never respond to negative reviews personally`,
        tags: ["phone", "cell", "electronics", "social media", "devices"],
      },
      {
        id: "code-of-conduct",
        title: "Code of Conduct",
        content: `**Professional Behavior**
- Treat all customers and coworkers with respect
- No gossiping or negative talk about colleagues
- Maintain a positive, helpful attitude
- Represent High Life professionally at all times

**Prohibited Conduct**
- Harassment of any kind
- Discrimination based on any protected class
- Violence or threats of violence
- Theft or dishonesty
- Insubordination

**Customer Interactions**
- Always greet customers within 30 seconds
- Never argue with a customer
- Escalate difficult situations to management
- Thank every customer for their visit

**Reporting Issues**
If you witness violations, report to:
- Your direct manager first
- HR if manager is involved
- Anonymous hotline available`,
        tags: ["conduct", "behavior", "professional", "respect", "rules"],
      },
    ],
  },
  {
    id: "compliance-legal",
    title: "Compliance & Legal",
    icon: "Scale",
    description: "Legal requirements and compliance procedures",
    articles: [
      {
        id: "id-verification",
        title: "ID Verification Requirements",
        content: `**Check EVERY Customer**
No exceptions - every customer must show valid ID before purchasing age-restricted products.

**Acceptable IDs**
- State-issued driver's license
- State-issued ID card
- US Passport
- Military ID
- Passport Card

**Not Acceptable**
- Expired IDs
- School IDs
- Work badges
- Photos of IDs
- Foreign IDs (without passport)

**Verification Process**
1. Ask for ID politely: "May I see your ID please?"
2. Check expiration date
3. Verify photo matches customer
4. Check birth date (must be 21+)
5. Look for security features
6. Enter birth date in VelaPOS

**When in Doubt**
If you suspect a fake ID or aren't sure, politely decline the sale and get a manager.`,
        tags: ["ID", "verification", "age", "check", "license", "21"],
      },
      {
        id: "proper-terminology",
        title: "Proper Terminology",
        content: `**Words We NEVER Use**
These terms imply illegal drug use and can result in legal issues:
- Bong → Use: "Water pipe"
- Bowl → Use: "Hand pipe" or "Dry pipe"
- Weed/Marijuana → Use: "Legal hemp products" or "Tobacco"
- Getting high → Never reference intoxication

**Why This Matters**
Using improper terminology can:
- Result in fines for the store
- Lead to license revocation
- Create legal liability
- Get employees terminated

**Customer Education**
If customers use improper terms:
- Don't correct them harshly
- Simply use the correct term in your response
- "Yes, this water pipe is great for..."

**Product References**
- Our products are for tobacco or legal hemp use only
- Never suggest illegal uses
- Don't discuss personal use`,
        tags: ["terminology", "words", "legal", "bong", "pipe", "language"],
      },
      {
        id: "sale-restrictions",
        title: "Sale Restrictions & Combinations",
        content: `**Items That CANNOT Be Sold Together**
Certain product combinations suggest illegal use and are prohibited:
- Glass pipes + Hemp products in same transaction
- Rolling papers + Hemp flower together
- Grinders + Hemp products together

**How to Handle**
If a customer wants restricted combinations:
1. Complete the first purchase
2. Ask customer to exit the store
3. Customer can return and make second purchase
4. Never suggest they come back - just complete one sale

**Quantity Limits**
Some products have purchase limits:
- Check VelaPOS for product-specific limits
- When in doubt, ask a manager

**Refusal of Sale**
You may refuse any sale if you suspect:
- Products are being purchased for resale
- Straw purchasing (buying for someone else)
- Illegal activity`,
        tags: ["restrictions", "combinations", "limits", "sale", "refuse"],
      },
      {
        id: "handling-reporters",
        title: "Handling Media & Reporters",
        content: `**If Approached by Media**
- Do NOT give interviews or statements
- Do NOT allow photos or videos
- Politely say: "I'm not authorized to speak to the media"
- Direct them to corporate communications
- Notify your manager immediately

**Undercover/Inspectors**
- Treat everyone as a potential inspector
- Always follow proper procedures
- Check every ID, every time
- Use correct terminology always

**If Cited or Inspected**
1. Remain calm and professional
2. Cooperate fully
3. Do not admit wrongdoing
4. Document everything
5. Contact your District Manager immediately
6. Write down inspector's information`,
        tags: ["media", "reporter", "press", "news", "inspector"],
      },
    ],
  },
  {
    id: "money-banking",
    title: "Money Handling & Banking",
    icon: "DollarSign",
    description: "Cash handling, deposits, and banking procedures",
    articles: [
      {
        id: "bank-runs",
        title: "Bank Run Procedures",
        content: `**Schedule**
Bank runs are done Monday, Wednesday, and Friday (or as needed when deposit exceeds limits).

**Before the Bank Run**
1. Count and verify deposit amount
2. Complete deposit slip accurately
3. Get change order if needed
4. Seal deposit in bank bag
5. Two people verify count and seal

**During the Bank Run**
- Go directly to the bank
- Do not make stops
- Keep deposit concealed
- Stay aware of surroundings
- Park close to bank entrance

**At the Bank**
- Get receipt for every transaction
- Verify change order is correct
- Count change before leaving
- Return directly to store

**After Returning**
- Secure change in safe
- File bank receipt with daily paperwork
- Update deposit log`,
        tags: ["bank", "deposit", "money", "run", "cash"],
      },
      {
        id: "deposit-slips",
        title: "Deposit Slips & Change Orders",
        content: `**Deposit Slips**
Must be completed accurately for every deposit:
- Date
- Store number
- Cash total (bills separated by denomination)
- Check total (rarely used)
- Grand total
- Preparer signature
- Verifier signature

**Change Orders**
When ordering change from the bank:
- Standard order: Quarters, dimes, nickels, pennies
- Ones and fives as needed
- Plan ahead for busy periods
- Keep minimum 3 days of change on hand

**Discrepancies**
If deposit doesn't match expected:
- Recount immediately
- Check for errors in ENR
- Document the discrepancy
- Notify manager
- Never alter records to match`,
        tags: ["deposit", "slip", "change", "order", "bank"],
      },
      {
        id: "counterfeit-detection",
        title: "Counterfeit Money Detection",
        content: `**Check These Features on Large Bills**
- Watermark (hold to light)
- Security thread (hold to light)
- Color-shifting ink ($10 and above)
- Microprinting
- Feel of paper (cotton/linen blend)

**Using Detection Tools**
- Counterfeit detection pens (for $20+)
- UV light (security features glow)
- Always check $50 and $100 bills

**If You Suspect Counterfeit**
1. Do NOT accuse the customer
2. Say: "I'm sorry, my manager needs to verify large bills"
3. Get your manager
4. Manager will handle the situation
5. If confirmed fake, do not return the bill
6. Document and report

**Scam Calls**
Never send money based on phone instructions claiming to be from:
- Corporate
- Police
- IRS
- Anyone threatening immediate consequences`,
        tags: ["counterfeit", "fake", "money", "detection", "scam"],
      },
      {
        id: "enr-completion",
        title: "End of Night Report (ENR)",
        content: `**What is the ENR?**
The End of Night Report documents all financial activity for the day and must be completed accurately every night.

**Sections to Complete**
1. **Header**: Date, store number, manager on duty
2. **Register Counts**: Opening and closing for each drawer
3. **Sales Summary**: From POS system
4. **Deposit Calculation**: Cash sales minus starting drawer
5. **Discrepancies**: Any over/short amounts
6. **Notes**: Unusual events, incidents, etc.

**Accuracy is Critical**
- Double-check all math
- Have second person verify
- Never alter to hide discrepancies
- Report issues honestly

**Filing**
- Original stays in store
- Copy with deposit
- Digital backup if applicable`,
        tags: ["ENR", "report", "night", "closing", "paperwork"],
      },
    ],
  },
  {
    id: "inventory-transfers",
    title: "Inventory & Transfers",
    icon: "Package",
    description: "Inventory management and store transfers",
    articles: [
      {
        id: "making-transfers",
        title: "How to Make a Transfer",
        content: `**When to Transfer**
- Another store needs product you have excess of
- Requested by District Manager
- Balancing inventory across locations

**Transfer Process**
1. Get approval from your manager
2. In VelaPOS: Inventory → Create Transfer
3. Select destination store
4. Scan or enter items being transferred
5. Print transfer slip (2 copies)
6. Package items securely
7. Send one slip with items
8. Keep one slip for your records

**Receiving Transfers**
1. Check items against transfer slip
2. Count and verify quantities
3. Note any discrepancies
4. Accept transfer in VelaPOS
5. Sign and date the slip
6. Put items in stock immediately

**Transfer Corrections**
If there's an error, do NOT just fix it:
1. Note the discrepancy
2. Contact sending store
3. Create correction in system
4. Both stores must confirm`,
        tags: ["transfer", "inventory", "move", "store", "receive"],
      },
      {
        id: "accepting-shipments",
        title: "Accepting Shipments",
        content: `**When Deliveries Arrive**
1. Verify delivery matches order/invoice
2. Count all boxes before signing
3. Note any visible damage
4. Sign for receipt

**Checking In Product**
1. Open boxes immediately
2. Compare items to packing slip
3. Count every item
4. Check for damage
5. Report shortages/damage same day

**Discrepancies**
If shipment doesn't match:
- Note on delivery receipt before signing
- Take photos of damage
- Email purchasing with details
- Do not put damaged items in inventory

**Stocking Priority (FIFO)**
First In, First Out:
- New product goes BEHIND old product
- Check expiration dates
- Rotate stock regularly
- Never sell expired product`,
        tags: ["shipment", "delivery", "receive", "order", "FIFO", "stock"],
      },
      {
        id: "physical-inventory",
        title: "Physical Inventory Counts",
        content: `**Regular Counts**
- Daily: High-value items, high-theft items
- Weekly: Section rotation
- Monthly: Full store count
- Annual: Complete audit

**Count Procedures**
1. Print count sheets from VelaPOS
2. Count items physically (don't assume)
3. Record actual count
4. Note discrepancies
5. Manager verifies counts
6. Enter into system

**Discrepancy Investigation**
When counts don't match:
- Recount immediately
- Check back stock
- Review recent sales
- Check transfer records
- Document findings

**Loss Prevention**
Inventory shortage can indicate:
- Theft (internal or external)
- Receiving errors
- Transfer errors
- System errors

Report patterns to management immediately.`,
        tags: ["inventory", "count", "physical", "audit", "shortage"],
      },
      {
        id: "item-requests",
        title: "Item Requests & Special Orders",
        content: `**Customer Requests**
When customers ask for items we don't carry:
1. Write down the item name
2. Get customer contact info
3. Submit request to manager
4. Follow up with customer

**Submitting Requests**
Email item requests to appropriate buyer:
- Include product name and brand
- Note customer demand level
- Provide competitor pricing if known

**Special Orders**
Some items can be specially ordered:
- Requires manager approval
- Customer may need to prepay
- Provide realistic timeline
- Follow up when item arrives

**Items We Cannot Order**
- Illegal items
- Items outside our product categories
- Brands we don't work with
Contact manager if unsure.`,
        tags: ["request", "order", "special", "product", "customer"],
      },
    ],
  },
  {
    id: "safety-security",
    title: "Safety & Security",
    icon: "ShieldAlert",
    description: "Safety procedures and security protocols",
    articles: [
      {
        id: "panic-button",
        title: "Panic Button & Emergencies",
        content: `**Panic Button Location**
Every register has a panic button. Know its exact location!
- Usually mounted under the counter
- Must be accessible without reaching
- Test location without pressing

**When to Use**
- Active robbery
- Violent customer
- Immediate threat to safety
- Medical emergency

**What Happens**
When pressed, police are dispatched immediately. DO NOT:
- Press as a test
- Press for minor incidents
- Tell others it was pressed

**After Pressing**
- Stay calm
- Comply with robber demands
- Do not chase or confront
- Wait for police
- Do not touch anything (evidence)`,
        tags: ["panic", "button", "emergency", "robbery", "safety", "police"],
      },
      {
        id: "theft-response",
        title: "Customer Theft Response",
        content: `**If You Suspect Theft**
- DO NOT confront the customer
- DO NOT accuse anyone
- Observe and remember details
- Alert a manager discreetly
- Let the manager handle it

**What to Observe**
- Physical description
- Clothing
- Items taken
- Direction of exit
- Vehicle information

**After Theft Occurs**
1. Do not chase
2. Lock doors (if safe to do so)
3. Call police
4. Write down everything you remember
5. Save security footage
6. Complete incident report

**Preventing Theft**
- Greet every customer
- Maintain awareness
- Keep high-value items secured
- Don't leave customers unattended`,
        tags: ["theft", "steal", "shoplifting", "security", "loss"],
      },
      {
        id: "employee-theft",
        title: "Employee Theft Policy",
        content: `**Zero Tolerance**
Employee theft results in immediate termination and potential prosecution.

**What Counts as Theft**
- Taking product without paying
- Giving unauthorized discounts
- Voiding transactions for cash
- Time theft (clocking in when not working)
- Giving away product to friends
- Manipulating inventory

**Reporting Theft**
If you witness employee theft:
- Report to manager
- If manager involved, report to DM or HR
- Anonymous tip line available
- Protection against retaliation

**Consequences**
- Immediate termination
- Police report filed
- Civil recovery pursued
- Industry blacklisting

**Protect Yourself**
- Never share register logins
- Count your drawer before and after
- Don't let others use your credentials`,
        tags: ["theft", "employee", "steal", "internal", "policy"],
      },
      {
        id: "battery-safety",
        title: "Battery Safety",
        content: `**Lithium Battery Hazards**
Vape batteries and similar products can be dangerous if mishandled.

**Safe Handling**
- Never puncture batteries
- Don't expose to extreme heat
- Use proper chargers only
- Check for damage before selling
- Store in cool, dry location

**Signs of Damaged Batteries**
- Swelling or bulging
- Discoloration
- Dents or cracks
- Unusual odor
- Excessive heat

**If Battery Emergency**
- Clear the area immediately
- Do not use water on lithium fires
- Use fire extinguisher (Class D if available)
- Call 911 if fire occurs
- Ventilate the area

**Customer Education**
- Inform customers of proper use
- Never charge unattended
- Use manufacturer chargers
- Replace damaged batteries`,
        tags: ["battery", "safety", "vape", "lithium", "fire"],
      },
    ],
  },
  {
    id: "contacts-resources",
    title: "Contacts & Resources",
    icon: "Phone",
    description: "Important contacts and submission information",
    articles: [
      {
        id: "important-contacts",
        title: "Important Contact List",
        content: `**Emergency**
- Police/Fire/Medical: 911
- Alarm Company: Check store posting
- Panic Button: Silent alarm under register

**Corporate Contacts**
- HR Department: Check store posting
- IT Support: Check store posting
- Loss Prevention: Check store posting

**Your Leadership Team**
- Store Manager: See schedule
- Assistant Manager: See schedule
- District Manager: Check store posting
- Field Manager: Check store posting

**Vendors**
- POS Support: Check store posting
- Cash Services: Check store posting

**Note**: Exact numbers are posted in the store office. Always verify you have current numbers.`,
        tags: ["contact", "phone", "number", "call", "emergency"],
      },
      {
        id: "email-submissions",
        title: "Email Submission Guide",
        content: `**Where to Email What**

**HR Submissions**
- Time-off requests
- Schedule changes
- Personal information updates
- Complaints and concerns

**Operations Submissions**
- Inventory issues
- Equipment problems
- Supply requests

**Loss Prevention**
- Theft reports
- Safety incidents
- Security concerns

**IT Support**
- POS issues
- Printer problems
- Technical difficulties

**Purchasing**
- Product requests
- Vendor issues
- Quality concerns

**Format Your Emails**
- Clear subject line with store number
- Brief description of issue
- Include date and time
- Attach photos if relevant
- Your name and contact info`,
        tags: ["email", "submit", "send", "HR", "IT", "contact"],
      },
      {
        id: "discounts",
        title: "Discount Types & Policies",
        content: `**Employee Discount**
- Percentage varies by position
- Must use on personal purchases only
- Cannot discount for friends/family
- Manager must approve and process

**Customer Discounts**
- Military: Valid military ID required
- Student: Valid student ID required  
- Senior: Age verification required
- VIP/Loyalty: Per store program

**Processing Discounts**
1. Verify eligibility
2. Apply discount in POS
3. Manager approval may be required
4. Note discount type on transaction

**Prohibited**
- Stacking multiple discounts
- Giving unauthorized discounts
- Discounting for personal gain
- Discount abuse will result in termination`,
        tags: ["discount", "employee", "military", "student", "senior"],
      },
      {
        id: "breakage-policy",
        title: "Breakage Policy & Tiers",
        content: `**When Breakage Occurs**
Accidents happen. Here's how to handle them:

**Immediate Steps**
1. Clean up safely (glass hazards)
2. Document what broke
3. Take photos
4. Notify manager
5. Complete breakage form

**Breakage Tiers**
- **Tier 1** ($0-25): Note in log
- **Tier 2** ($25-100): Manager report
- **Tier 3** ($100-500): DM notification
- **Tier 4** ($500+): LP investigation

**Employee Responsibility**
- Accidents: Generally not charged to employee
- Negligence: May result in write-up
- Pattern: Will be addressed
- Intentional: Immediate termination

**Prevention**
- Handle products carefully
- Use both hands for glass
- Keep work areas clear
- Report unstable displays`,
        tags: ["breakage", "broken", "damage", "glass", "policy"],
      },
    ],
  },
]

export function searchHandbook(query: string): HandbookArticle[] {
  const lowerQuery = query.toLowerCase()
  const results: HandbookArticle[] = []

  handbookSections.forEach((section) => {
    section.articles.forEach((article) => {
      const matchesTitle = article.title.toLowerCase().includes(lowerQuery)
      const matchesContent = article.content.toLowerCase().includes(lowerQuery)
      const matchesTags = article.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))

      if (matchesTitle || matchesContent || matchesTags) {
        results.push(article)
      }
    })
  })

  return results
}
