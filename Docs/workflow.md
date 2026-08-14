# 🌱 Workflow

## Workflow Thinking — Sequential Workflow & State Machine Workflow

### From “Writing Code” to “Designing Business Flow”

One morning in the Transflower classroom, I asked my developer students:  **“When a customer buys an insurance policy, is it just one API call?”**  One student immediately answered:  “Sir, we can create a `POST /policies` API.”  I smiled.  “Technically, yes. But business-wise, what actually happens?” The room became quiet. I drew a simple picture on the board:

```text
Customer
   ↓
Select Policy
   ↓
Submit Application
   ↓
Verify Customer
   ↓
Check Eligibility
   ↓
Calculate Premium
   ↓
Make Payment
   ↓
Issue Policy
   ↓
Notify Customer
```

Then I said:  **“This is not just code. This is a workflow.”** And that is where today's learning begins.

###  Learning Objectives

By the end of this session, developers should be able to:

* Understand what a workflow is
* Identify workflow steps in a business process
* Model a sequential workflow
* Understand state-machine-based workflows
* Distinguish **process flow** from **state**
* Design workflows for an insurance application
* Identify where APIs, services, databases and background workers fit
* Handle failures, retries and human intervention
* Recognize when a simple workflow is enough and when a state machine is better

## 1. What Is a Workflow?

Let's forget technology for a moment. Suppose an insurance customer wants to purchase a policy. The business says: “First verify the customer. Then check eligibility. Then calculate premium. Then collect payment. Then issue the policy.” That sequence is a **workflow**. A workflow describes:  **What needs to happen, in what order, and under what conditions.**

Think:

```text
Business Process
       ↓
Workflow
       ↓
Steps
       ↓
Actions
       ↓
Result
```


## 2. Workflow Is Bigger Than a Method

A developer may write:

```java
purchasePolicy();
```

or:

```csharp
PurchasePolicy();
```

But inside the business, purchasing a policy may involve:

```text
Customer Verification
        ↓
Eligibility
        ↓
Premium Calculation
        ↓
Payment
        ↓
Policy Issuance
        ↓
Notification
```

A workflow may therefore span:

* multiple methods
* multiple services
* multiple APIs
* multiple databases
* external systems
* human approvals
* background jobs
* retries
* failures

So remember: **A method executes code. A workflow coordinates business activities.**


## 3. Our Insurance Application

Let's use a familiar Transflower project.

### Insurance Management System

Our system contains:

```text
Customer
Policy
Premium
Payment
Claim
Agent
Manager
Notification
```

Suppose our business requirement is: **Make First Premium Payment and Issue Policy** We can model the process as:

```text
Customer
   ↓
Select Policy
   ↓
Create Application
   ↓
Verify Customer
   ↓
Check Eligibility
   ↓
Calculate Premium
   ↓
Collect First Premium
   ↓
Issue Policy
   ↓
Send Confirmation
```

Now we have our first workflow.

 

## 4. Sequential Workflow

The simplest workflow is a **sequential workflow**. One step executes after another.

```text
Step 1
  ↓
Step 2
  ↓
Step 3
  ↓
Step 4
  ↓
Step 5
```

For our insurance application:

```text
Create Application
       ↓
Verify Customer
       ↓
Check Eligibility
       ↓
Calculate Premium
       ↓
Collect Payment
       ↓
Issue Policy
       ↓
Send Notification
```

The important characteristic is:  **The order matters.** You shouldn't issue a policy before verifying the customer. You shouldn't collect a premium before determining the amount. You shouldn't send a successful policy confirmation before the policy is actually issued.


## 5. Think Like a Developer

A developer may initially implement:

```text
PurchasePolicy()
```

But I want you to think:

```text
PurchasePolicy Workflow

1. Create application
2. Verify customer
3. Check eligibility
4. Calculate premium
5. Collect payment
6. Issue policy
7. Notify customer
```

Now each step can map to a service.

```text
PolicyApplicationService
CustomerVerificationService
EligibilityService
PremiumService
PaymentService
PolicyIssuanceService
NotificationService
```

Our architecture becomes:

```text
                 Workflow
                    │git aggksjflka
        ┌───────────┼────────────┐
        ↓           ↓            ↓
   Customer      Policy       Payment
   Service       Service      Service
        │           │            │
        └───────────┼────────────┘
                    ↓
                 Database
```

This is a much better engineering conversation than:  “Which controller should I write?”


## 6. Sequential Workflow with Decisions

Real workflows aren't always a straight line. Suppose customer verification fails.

```text
Create Application
       ↓
Verify Customer
       ↓
   ┌───┴────┐
   ↓        ↓
Success    Failed
   ↓        ↓
Eligibility  Reject
```

Similarly:

```text
Eligibility
     ↓
 ┌───┴───────┐
 ↓           ↓
Eligible   Not Eligible
 ↓           ↓
Premium     Reject
```

So our workflow becomes:

```text
Create Application
       ↓
Verify Customer
       ↓
Customer Verified?
   ┌───┴──────┐
   No         Yes
   ↓           ↓
 Reject    Eligibility
              ↓
        Eligible?
          ┌───┴─────┐
          No        Yes
          ↓          ↓
        Reject    Premium
                      ↓
                   Payment
                      ↓
                  Issuance
```

Now we have introduced **business decisions**.

 
## 7. The Important Question

I ask the class: **“What happens if payment fails?”** A student might say: “Return HTTP 400.” I smile again. “That is an API response. I asked about the business workflow.” The business answer might be:

```text
Payment Failed
      ↓
Payment Pending
      ↓
Retry Payment
      ↓
Payment Successful
```

Or:

```text
Payment Failed
      ↓
Application Cancelled
```

Now we have entered the world of **state**.

## 8. What Is State?

A state describes: **What condition the business object is currently in.** Consider an insurance policy. It may be:

```text
Draft
PendingVerification
Verified
PendingPayment
Active
Expired
Cancelled
```

The policy cannot logically be in all these states at the same time. At any point, we should know:  **What is the current state of this policy?**

For example:

```text
Policy #1001

Current State:
PendingPayment
```

That is very different from merely knowing which method is currently executing.

## 9. Workflow vs State

This distinction is extremely important.

- Workflow asks:  **What should happen next?**
- State asks: **Where are we now?**

For example:

```text
Workflow:

Verify Customer
      ↓
Check Eligibility
      ↓
Collect Payment
      ↓
Issue Policy
```

State:

```text
Policy

Draft
  ↓
Verified
  ↓
PendingPayment
  ↓
Active
```

Think of it this way:

```text
Workflow = Journey

State = Current Location
```


## 10. State Machine Workflow

Now imagine a policy application can move between states.

```text
                 ┌──────────────┐
                 │     Draft    │
                 └──────┬───────┘
                        │ Submit
                        ↓
              ┌────────────────────┐
              │PendingVerification │
              └────────┬───────────┘
                       │ Verified
                       ↓
              ┌──────────────────┐
              │PendingEligibility│
              └────────┬─────────┘
                       │ Eligible
                       ↓
                ┌───────────────┐
                │PendingPayment │
                └───────┬───────┘
                        │ Paid
                        ↓
                  ┌──────────┐
                  │  Active  │
                  └──────────┘
```

This is a **state machine**. The application moves from one state to another based on an event or condition.

 

## 11. State + Event + Transition

Three words become very important.

- State -> Where are we?
- Event -> What happened?
- Transition -> What state should we move to?

For example:

```text
Current State:
PendingPayment

Event:
PaymentSuccessful

Transition:
PendingPayment → Active
```

Another example:

```text
Current State:
PendingPayment

Event:
PaymentFailed

Transition:
PendingPayment → PaymentFailed
```

So:

```text
State
  +
Event
  ↓
Transition
  ↓
New State
```

This is the heart of state-machine thinking.

 
## 12. Insurance Policy State Machine

Let's make it realistic.

```text
                    ┌─────────────┐
                    │    Draft    │
                    └──────┬──────┘
                           │ Submit
                           ↓
                ┌────────────────────┐
                │ Under Verification │
                └─────────┬──────────┘
                          │ Verified
                          ↓
                ┌────────────────────┐
                │ Eligibility Check  │
                └───────┬──────┬─────┘
                        │      │
                   Eligible   Rejected
                        │      │
                        ↓      ↓
                ┌────────────┐ Rejected
                │  Payment   │
                │  Pending   │
                └─────┬──────┘
                      │
               Payment Success
                      ↓
                ┌───────────┐
                │   Active  │
                └─────┬─────┘
                      │
                Policy Expired
                      ↓
                ┌───────────┐
                │  Expired  │
                └───────────┘
```

Now our database might contain:

```text
policies
--------------------------
id
policy_number
customer_id
product_id
premium
status
created_at
updated_at
```

Where:

```text
status
```

represents the current state.


## 13. Why State Machines Matter

Suppose your application crashes after payment succeeds but before the policy is issued. What happens when the application restarts? If you only think in terms of methods, you may not know where you were. But if you persist state:

```text
Policy Status = PaymentCompleted
```

the workflow engine or application can understand:  “Payment is already completed. I should continue from the next step.” This is a major enterprise workflow concept.
 

## 14. Sequential Workflow vs State Machine

Let's compare.

| Sequential Workflow                | State Machine Workflow               |
| ---------------------------------- | ------------------------------------ |
| Focuses on sequence                | Focuses on state                     |
| Step 1 → Step 2 → Step 3           | State → Event → State                |
| Good for straightforward processes | Good for long-running processes      |
| Usually linear                     | Can branch and loop                  |
| Easy to understand                 | More powerful                        |
| Failure often stops execution      | Can resume from persisted state      |
| Good for short processes           | Good for complex business lifecycles |

A simple process:

```text
Generate Invoice
 ↓
Create PDF
 ↓
Send Email
```

may not need a state machine. A policy lifecycle:

```text
Draft
 ↓
Verification
 ↓
Approval
 ↓
Payment
 ↓
Active
 ↓
Renewal
 ↓
Expired
```

is a strong candidate for state-machine thinking.

## 15. Developer Exercise — Design the Workflow

Now I stop teaching. I give students a business requirement:  **“A customer wants to purchase a health insurance policy.”**  They must identify:

### Step 1 — Activities

```text
Create Application
Verify Customer
Check Eligibility
Calculate Premium
Collect Payment
Issue Policy
Send Notification
```

### Step 2 — States

```text
Draft
UnderVerification
Eligible
PaymentPending
Active
Rejected
Cancelled
```

### Step 3 — Events

```text
ApplicationSubmitted
CustomerVerified
EligibilityApproved
EligibilityRejected
PaymentSuccessful
PaymentFailed
PolicyIssued
ApplicationCancelled
```

### Step 4 — Transitions

```text
Draft
 ↓ ApplicationSubmitted
UnderVerification

UnderVerification
 ↓ CustomerVerified
Eligible

Eligible
 ↓ PremiumCalculated
PaymentPending

PaymentPending
 ↓ PaymentSuccessful
Active
```

Now the student is no longer merely coding. The student is **modeling a business process**.

 
## 16. From Workflow to Code

Only after drawing the workflow do we write code. For example, a state enum:

```java
public enum PolicyState {
    DRAFT,
    UNDER_VERIFICATION,
    ELIGIBLE,
    PAYMENT_PENDING,
    ACTIVE,
    REJECTED,
    CANCELLED,
    EXPIRED
}
```

And events:

```java
public enum PolicyEvent {
    SUBMIT,
    VERIFY,
    APPROVE,
    REJECT,
    PAYMENT_SUCCESS,
    PAYMENT_FAILED,
    CANCEL,
    EXPIRE
}
```

Now the developer can implement transition rules. The important lesson is:  **Don't start with the enum. Start with the business process.**

 

## 17. Where Does Spring Boot Fit?

Now we connect workflow thinking to the technology students already know.

```text
React / Angular
       ↓
Spring Boot REST API
       ↓
Workflow Service
       ↓
Business Services
       ↓
Repositories
       ↓
Database
```

For example:

```text
POST /applications
       ↓
ApplicationController
       ↓
PolicyWorkflowService
       ↓
VerificationService
       ↓
EligibilityService
       ↓
PaymentService
       ↓
PolicyService
```

For a state-machine implementation:

```text
POST /applications/{id}/submit
       ↓
Workflow Service
       ↓
Current State
       ↓
Event
       ↓
Transition
       ↓
New State
       ↓
Database
```


## 18. Where Does Asynchronous Processing Fit?

Now make the problem more realistic. Suppose:  Policy PDF generation takes 30 seconds. Should the HTTP request wait? Probably not. Instead:

```text
Policy Issued
      ↓
Publish Event
      ↓
Queue
      ↓
Background Worker
      ↓
Generate PDF
      ↓
Send Email
```

Now our workflow touches:

```text
Spring Boot
   +
Workflow
   +
Database
   +
Message Broker
   +
Background Worker
```

This is where technologies such as:

```text
RabbitMQ
Kafka
MassTransit
Hangfire
```

can become relevant depending on the architecture and workload.

## 19. A More Realistic Enterprise Workflow

Imagine: Customer purchases a policy. The complete process could be:

```text
Customer
   ↓
Submit Application
   ↓
Create Policy Application
   ↓
Customer Verification
   ↓
Eligibility Assessment
   ↓
Risk Assessment
   ↓
Manager Approval
   ↓
Premium Calculation
   ↓
Payment
   ↓
Policy Issuance
   ↓
Generate Policy Document
   ↓
Send Email
   ↓
Activate Policy
```

Notice something.

Some steps are:

**Synchronous**

```text
Validate Customer
Calculate Premium
```

Some may be:

**Asynchronous**

```text
Generate PDF
Send Email
```

Some may require:

**Human intervention**

```text
Manager Approval
```

Some may require:

**Retry**

```text
Payment
External Verification
```

Some may require:

**State persistence**

```text
Pending Approval
Payment Pending
Document Generation Pending
```

Now we are thinking like enterprise architects.
 

## 20. The Bigger Picture

- A beginner asks:  “Which class should I write?” 
- A developer asks:  “Which API should I expose?”
- An experienced developer asks:  **“What is the business workflow?”**
- An architect asks: **“How should the workflow behave under failure, retry, concurrency, timeout, human approval and recovery?”**

That is the progression I want students to experience.
 

## 🌻 Transflower Challenge

Take our **Insurance Management System**.

- Don't open Visual Studio.
- Don't open IntelliJ.
- Don't start writing a controller.
- Take a whiteboard.
- Design:

### Business Workflow

```text
Purchase Policy
```

### States

```text
Draft
Verification
Eligibility
Approval
Payment
Active
Rejected
Cancelled
Expired
```

### Events

```text
Submit
Verify
Approve
Reject
Pay
Cancel
Expire
```

### Transitions

```text
State + Event → New State
```

### Services

```text
CustomerService
EligibilityService
PremiumService
PaymentService
PolicyService
NotificationService
```

### Infrastructure

```text
Database
Message Broker
Background Worker
External Payment Gateway
Email Service
```

Only after this model is clear:

> **Start coding.**


# Final Mentor Message

I would end the session by telling the students: **“A software application is not a collection of controllers.
> It is a collection of business processes.”**

And:

> **“A workflow is the story of how a business process moves from beginning to completion.”**

A sequential workflow teaches you: **What happens next?**
A state machine teaches you: **Where are we now, what happened, and where can we go next?**
And enterprise workflow engineering teaches you something even bigger: **What happens when the system fails in the middle?**

That is where a developer becomes an engineer.

```text
Business Requirement
        ↓
Business Process
        ↓
Workflow
        ↓
States + Events
        ↓
Services
        ↓
APIs
        ↓
Database
        ↓
Messages / Background Jobs
        ↓
Failure + Retry + Recovery
        ↓
Enterprise System
```

> **Don't begin workflow programming with a framework.
> Begin with a business story.**

> **Understand the story.
> Draw the flow.
> Identify the states.
> Identify the events.
> Define the transitions.
> Then write the code.**

That is **workflow thinking**.