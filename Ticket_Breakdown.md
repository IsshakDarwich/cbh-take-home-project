# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here
**Ticket 1**
- Urgency Level: medium
- Stake Holders: Database Analyst, Business Analyst
- Acceptance Criteria: Make it possible to write, read and update custom_ids.
- Time estimated: 3 hours
- Implementation Details: A new table (CustomIds) must be created to store 3 fields(ids) -> custom_id (will be given by our Facilities partners), facilitie_id(from Facilities table) and agent_id(from Agents table). The type of the field _custom_id_ must be flexible enough to accept the different type of values that our Facilities partners may introduce (validate with the responsible BA).
Example: Agent Luke (id: 00001) has also two custom ids(custom_id field), at Johns Hopkins is "JHA-0020" and at Jackson is "233".

**Ticket 2**
- Urgency Level: medium
- Stake Holders: DEV, BA
- Acceptance Criteria: Facilitie can Add, Update and Consult a custom id for each agent.
- Time estimated: 4 hours
- Implementation Details: create a new field named Custom ID in the Agent Management View, that field must be connected to CustomIds table. The first time the Facilitie enters the Agent Management View, this created field should be empty, the custom id field should only be updated when some value has been inserted and the button _SAVE_ has been pressed. 

**Ticket 3**
- Urgency Level: medium
- Stake Holders: DEV, BA, PO
- Acceptance Criteria: Generates report containing custom ids for each agent in the Facilitie.
- Time estimated: 2 hours
- Implementation Details: Update the _generateReport_ function, changing the displayed agent_id by **custom_id** (if the custom_id exists).