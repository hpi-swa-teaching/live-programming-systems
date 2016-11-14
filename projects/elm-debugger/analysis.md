---
title: Elm Debugger
author: Jonas Chromik
bibliography: references.bib
---

# Live Programming Seminar
- Your Name: Jonas Chromik
- Your Topic: Elm Debugger

>Generally try to drill down on reasons behind properties of the system. Make use of the general observations about the system in arguing about specific properties or mechanisms.

## About the System itself
>Summary of system properties

The system studied is the time-traveling Elm Debugger. The Elm debugger can be tried out at `http://debug.elm-lang.org/` where three example Elm applications using the debugger are presented.
The debugger can be used while developing Elm applications. Unfortunately, the time-traveling features where removed from the Elm core/Debug package in version 4.0.0. Therefore we focus on the version deployed at `http://debug.elm-lang.org/` since we want to inspect the debugger including the time-traveling features.

### System boundaries
>What have you looked at exactly? Mention the boundaries of the system and state what is included and excluded. For example, in Chrome the system might be the developer tools. This ignores any JavaScript libraries which might add additional live capabilities to the tools or to the page currently developed. Another example are auto-testing setups which span a particular editor, testing framework, and auto-testing tool.

This work studies the time-traveling Elm debugger (core/Debug package version 3.0.0 or lower). This includes the debugger framework (tools for replaying input and watching values) together with an observed Elm application. The focus lies on the interaction between user and debugger as well as on the interaction between debugger and application.
<figure>
We do not cover the Elm language itself or packages used with Elm.
The focus is clearly on the liveness of the debugger, not the language itself.

### Context
>  - In which context is the system used?
    For example: Application development (coding, debugging, exploration), education, art, science (data exploration), simulation, exploration of ideas or data.
>  - Description of user context
    (professional, amateur, public presentation in front of audience, (un)known requirements, children, ...)

  - The context of the system is Application development in general and debugging of Elm applications in special.
  Furthermore the Elm debugger can also be used for understanding the behavior of an application without any bug involved. Therefore code exploration is also considerable use case.

  - Since the system under focus is the version of the Elm debugger deployed at `http://debug.elm-lang.org/`, the user context is public presentation of software using a website. Also, the application may be used by amateur Elm developers since the set up effort is low and therefore the system is easily accessible. Professionals will use their own setup of the Elm debugger, though, because the Elm debugger at `http://debug.elm-lang.org/` can only handle one file at a time which is not suitable for larger applications.


### General Application Domain
>  - What is typically created in or through this system?
>  - What are users trying to accomplish with it?
>  - What kind of systems are modified or developed with it (graphical application, client-server architecture, big data, streaming)?
>  - ...

- Typical output of the system is a bug-free Elm source code file. Notice, that the purpose of the system is not only its output but also the user experience while creating the output. The website showing the debugger is for presentational purposes and therefore the users understanding of the concept is important.
- The user either tries to find a bug in a piece of Elm source code or tries to understand how the source code works. Like in other debuggers too, the goal is understanding why and how an application works.
- Subject to the Elm debugger are single-page websites built with Elm. Elm is a functional programming language on top of Node.js. Main use case of Elm is the construction of web user interfaces using a model-view-update (<?>) pattern.

### Design Goals of the System
>What is the design rational behind the system? Which values are supported by the system? Which parts of the system reflect this rational? For example, auto-testing setups are designed to improve productivity by improving the workflow for TDD through providing feedback on the overall system behavior during programming. Smalltalk systems are designed for expressiveness and enabling understanding through allowing users to directly access and manipulate all runtime objects in the system.

The time-traveling Elm debugger helps understanding, how a specific change in the applications source code affects the applications output in context of the input given by the user.
Although the tool is called a debugger, its main purpose is improving the developers understanding of an application rather than finding bugs.
The time-traveling features help getting a meaningful impression of the connection between change in source code and its effect by providing access to all input that already happened rather than only the current input. Replaying the input helps finding out not only what the change in source code does to the current state but also what it would have done to every state before.

### Type of System
>What is the general nature of the system? For example: interactive tool, system, library, language, execution environment, application. What makes the system part of that category?

The system is an interactive tool. It is part of the Elm package system and can be invoked by import and invocation through the source code.

---

## Workflows
>Summary of workflow observations

### Example Workflow
>Description of the major workflow which illustrates all relevant "live programming" features. The workflow description should cover all major elements and interactions available. Augmented by annotated pictures and screencast.

### Which activities are made live by which mechanisms?
>Description of each concrete activity in the workflow and the underlying liveness mechanism (which is described on a conceptual level and thus could be mapped to other systems)
- Actual interactions
- Feedback mechanism
- If applicable: How is the emergence phase shortened?
- Granularity: For example: Elm can only rerun the complete application

### Integration of live activities into overall system
>Which activities in the system are not interactive anymore? Which elements can be manipulated in a live fashion and which can not?

>How does this workflow integrate with other parts of the system (potentially not live)? What happens at the boundaries between live parts and non-live parts? For example, the interactively assembled GUI is later passed to a compiler which creates an executable form of the GUI.

### Limitations
>To which extend can the liveness of one activity be kept up? For example, at which magnitude of data flow nodes does the propagation of values become non-immediate? At which magnitude of elapsed time can the Elm debugger not replay the application immediately anymore or when does it break down? Does an exception break the liveness?
Further, what are conceptual limitations. For example, in a bi-directional mapping system properties of single elements might be modified and reflected in the code. This might not be possible for properties of elements created in loops.

### What happens when the live parts of the system fail/break?
>1. What happens when the application under development causes an exception? How does the system handle these exceptions (provide debugger, stop execution, stop rendering, ...)? Does the liveness extend to these exceptions?
>2. How can the system itself break? What happens when there is a failure in the system/tool itself?

### Left out features
>Which features of the system were not described and why were they left out?

---

## Models

### Mutable or immutable past
>To which category does the system or parts of it belong and why?

*P. Rein and S. Lehmann and Toni & R. Hirschfeld How Live Are Live Programming Systems?: Benchmarking the Response Times of Live Programming Environments Proceedings of the Programming Experience Workshop (PX/16) 2016, ACM, 2016, 1-8*

### Tanimoto's Level of Live Programming
To which level of liveness do single activities belong, based on the definitions of the 2013 paper and why?
>
*S. L. Tanimoto A perspective on the evolution of live programming Proceedings of the 1st International Workshop on Live Programming, LIVE 2013, 2013, 31-34*

### Steady Frame
>Which activities are designed as steady frames based on the formal definition and how?

*C. M. Hancock Real-Time Programming and the Big Ideas of Computational Literacy Massachusetts Institute of Technology, Massachusetts Institute of Technology, 2003*

### Impact on distances
>How do the activities affect the different distances: temporal, spatial, semantic?

*D. Ungar and H. Lieberman & C. Fry Debugging and the Experience of Immediacy Communications of the ACM, ACM, 1997, 40, 38-43*

---

## Implementing Liveness

### Extend of liveness in technical artifacts
>What parts of the system implements the liveness? (Execution environment, library, tool...)

### Implementations of single activities
>Description of the implementation of live activities. Each implementation pattern should be described through its concrete incarnation in the system (including detailed and specific code or code references) and as an abstract concept.

#### Example: Scrubbing
>The mouse event in the editor is captured and if the underlying AST element allows for scrubbing a slider is rendered. On changing the slider the value in the source code is adjusted, the method including the value is recompiled. After the method was compiled and installed in the class, the execution continues. When the method is executed during stepping the effects of the modified value become apparent.

>Abstract form: Scrubbing is enabled through incremental compilation which enables quick recompilation of parts of an application...

### Within or outside of the application
>For each activity: Does the activity happen from within the running application or is it made possible from something outside of the application? For example, a REPL works within a running process while the interactions with an auto test runner are based on re-running the application from the outside without any interactive access to process internal data.

---

## Benchmark
>1. **Unit of change:** Determine relevant units of change from the user perspective. Use the most common ones.
>2. **Relevant operations:** Determine relevant operations on these units of change (add, modify, delete, compound operations (for example refactorings)).
>3. **Example data:** Select, describe, and provide representative code samples which reflect the complexity or length of a common unit of change of the environment. The sample should also work in combination with any emergence mechanisms of the environment, for example a replay system works well for a system with user inputs and does not match a long-running computation.
>4. **Reproducible setup of system and benchmark**
  1. Description of installation on Ubuntu 16.04.1 LTS
  2. Description of instrumentation of system for measurements: The measurements should be taken as if a user was actually using a system. So the starting point of a measurement might be the keyboard event of the save keyboard shortcut or the event handler of a save button. At the same time the emergence phase ends when the rendering has finished and the result is perceivable. The run should include all activities which would be triggered when a developer saves a unit of change (for example regarding logging or persisting changes).
>5. **Results for adaptation and emergence phase**

*P. Rein and S. Lehmann and Toni & R. Hirschfeld How Live Are Live Programming Systems?: Benchmarking the Response Times of Live Programming Environments Proceedings of the Programming Experience Workshop (PX/16) 2016, ACM, 2016, 1-8*

---

## Personal observations
>Everything that is particular about the environment and does not fit into the pre-defined categories mentioned so far.

## Style Template
>- Denote headings with #
>- You can use any text highlighting, list types, and tables
>- Insert images in the following way:
>  `![This is the caption](/url/of/image.png)`
>- Insert videos or web resources as markdown links
>- Insert references as: `@RefKey` and supply a bib file
>- No HTML tags please
