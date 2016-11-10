---
title: Elm Debugger
author: Jonas Chromik
bibliography: references.bib
---

# Live Programming Seminar
- Your Name: Jonas Chromik
- Your Topic: Elm Debugger

Generally try to drill down on reasons behind properties of the system. Make use of the general observations about the system in arguing about specific properties or mechanisms.

## About the System itself
The system studied is the time-traveling Elm Debugger. The system can be tried out at `http://debug.elm-lang.org/` where three example Elm applications using the debugger are presented.
Theoretically, the time-traveling debugger could be used while developing an Elm applications. Unfortunately, the time-traveling features where removed from the Elm core/Debug package in version 4.0.0.

### System boundaries
What have you looked at exactly? Mention the boundaries of the system and state what is included and excluded. For example, in Chrome the system might be the developer tools. This ignores any JavaScript libraries which might add additional live capabilities to the tools or to the page currently developed. Another example are auto-testing setups which span a particular editor, testing framework, and auto-testing tool.

### Context
  - In which context is the system used?
    For example: Application development (coding, debugging, exploration), education, art, science (data exploration), simulation, exploration of ideas or data.
  - Description of user context (professional, amateur, public presentation in front of audience, (un)known requirements, children, ...)

### General Application Domain
  - What is typically created in or through this system?
  - What are users trying to accomplish with it?
  - What kind of systems are modified or developed with it (graphical application, client-server architecture, big data, streaming)?
  - ...

### Design Goals of the System
What is the design rational behind the system? Which values are supported by the system? Which parts of the system reflect this rational? For example, auto-testing setups are designed to improve productivity by improving the workflow for TDD through providing feedback on the overall system behavior during programming. Smalltalk systems are designed for expressiveness and enabling understanding through allowing users to directly access and manipulate all runtime objects in the system.

### Type of System
What is the general nature of the system? For example: interactive tool, system, library, language, execution environment, application. What makes the system part of that category?

---

## Workflows
Summary of workflow observations

### Example Workflow
Description of the major workflow which illustrates all relevant "live programming" features. The workflow description should cover all major elements and interactions available. Augmented by annotated pictures and screencast.

### Which activities are made live by which mechanisms?
Description of each concrete activity in the workflow and the underlying liveness mechanism (which is described on a conceptual level and thus could be mapped to other systems)
- Actual interactions
- Feedback mechanism
- If applicable: How is the emergence phase shortened?
- Granularity: For example: Elm can only rerun the complete application

### Integration of live activities into overall system
Which activities in the system are not interactive anymore? Which elements can be manipulated in a live fashion and which can not?

How does this workflow integrate with other parts of the system (potentially not live)? What happens at the boundaries between live parts and non-live parts? For example, the interactively assembled GUI is later passed to a compiler which creates an executable form of the GUI.

### Limitations
To which extend can the liveness of one activity be kept up? For example, at which magnitude of data flow nodes does the propagation of values become non-immediate? At which magnitude of elapsed time can the Elm debugger not replay the application immediately anymore or when does it break down? Does an exception break the liveness?
Further, what are conceptual limitations. For example, in a bi-directional mapping system properties of single elements might be modified and reflected in the code. This might not be possible for properties of elements created in loops.

### What happens when the live parts of the system fail/break?
1. What happens when the application under development causes an exception? How does the system handle these exceptions (provide debugger, stop execution, stop rendering, ...)? Does the liveness extend to these exceptions?
2. How can the system itself break? What happens when there is a failure in the system/tool itself?

### Left out features
Which features of the system were not described and why were they left out?

---

## Models

### Mutable or immutable past
To which category does the system or parts of it belong and why?

*P. Rein and S. Lehmann and Toni & R. Hirschfeld How Live Are Live Programming Systems?: Benchmarking the Response Times of Live Programming Environments Proceedings of the Programming Experience Workshop (PX/16) 2016, ACM, 2016, 1-8*

### Tanimoto's Level of Live Programming
To which level of liveness do single activities belong, based on the definitions of the 2013 paper and why?

*S. L. Tanimoto A perspective on the evolution of live programming Proceedings of the 1st International Workshop on Live Programming, LIVE 2013, 2013, 31-34*

### Steady Frame
Which activities are designed as steady frames based on the formal definition and how?

*C. M. Hancock Real-Time Programming and the Big Ideas of Computational Literacy Massachusetts Institute of Technology, Massachusetts Institute of Technology, 2003*

### Impact on distances
How do the activities affect the different distances: temporal, spatial, semantic?

*D. Ungar and H. Lieberman & C. Fry Debugging and the Experience of Immediacy Communications of the ACM, ACM, 1997, 40, 38-43*

---

## Implementing Liveness

### Extend of liveness in technical artifacts
What parts of the system implements the liveness? (Execution environment, library, tool...)

### Implementations of single activities
Description of the implementation of live activities. Each implementation pattern should be described through its concrete incarnation in the system (including detailed and specific code or code references) and as an abstract concept.

#### Example: Scrubbing
The mouse event in the editor is captured and if the underlying AST element allows for scrubbing a slider is rendered. On changing the slider the value in the source code is adjusted, the method including the value is recompiled. After the method was compiled and installed in the class, the execution continues. When the method is executed during stepping the effects of the modified value become apparent.

Abstract form: Scrubbing is enabled through incremental compilation which enables quick recompilation of parts of an application...

### Within or outside of the application
For each activity: Does the activity happen from within the running application or is it made possible from something outside of the application? For example, a REPL works within a running process while the interactions with an auto test runner are based on re-running the application from the outside without any interactive access to process internal data.

---

## Benchmark
1. **Unit of change:** Determine relevant units of change from the user perspective. Use the most common ones.
2. **Relevant operations:** Determine relevant operations on these units of change (add, modify, delete, compound operations (for example refactorings)).
3. **Example data:** Select, describe, and provide representative code samples which reflect the complexity or length of a common unit of change of the environment. The sample should also work in combination with any emergence mechanisms of the environment, for example a replay system works well for a system with user inputs and does not match a long-running computation.
4. **Reproducible setup of system and benchmark**
  1. Description of installation on Ubuntu 16.04.1 LTS
  2. Description of instrumentation of system for measurements: The measurements should be taken as if a user was actually using a system. So the starting point of a measurement might be the keyboard event of the save keyboard shortcut or the event handler of a save button. At the same time the emergence phase ends when the rendering has finished and the result is perceivable. The run should include all activities which would be triggered when a developer saves a unit of change (for example regarding logging or persisting changes).
5. **Results for adaptation and emergence phase**

*P. Rein and S. Lehmann and Toni & R. Hirschfeld How Live Are Live Programming Systems?: Benchmarking the Response Times of Live Programming Environments Proceedings of the Programming Experience Workshop (PX/16) 2016, ACM, 2016, 1-8*

---

## Personal observations
Everything that is particular about the environment and does not fit into the pre-defined categories mentioned so far.

## Style Template
- Denote headings with #
- You can use any text highlighting, list types, and tables
- Insert images in the following way:
  `![This is the caption](/url/of/image.png)`
- Insert videos or web resources as markdown links
- Insert references as: `@RefKey` and supply a bib file
- No HTML tags please
