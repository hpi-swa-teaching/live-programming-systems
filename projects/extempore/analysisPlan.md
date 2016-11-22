---
title: Extempore
author: Florian Wagner
bibliography: Name of your bibfile
---

# Live Programming Seminar
- Your Name: Florian Wagner
- Your Topic: Extempore

Generally try to drill down on reasons behind properties of the system. Make use of the general observations about the system in arguing about specific properties or mechanisms.

## About the System itself
Extempore is a plattform for live programming, especially music. It supports two languages, both LISP Dialects, which can be used for the actual programs. During runtime code can be submitted to the system and is evaluated in the context of the current state of the system, as build by previous instructions and code.

### System boundaries
Extempore is build around a server/client architecture, where the clients submit code via TCP to the server, running extempore. The clients can be anything that supports TCP, even telnet, as the server reads a raw TCP-Stream and evaluates it. To evaluate the code, the server implements two different dialects of LISP, which operate in a semi-shared environment [TODO: what is shared, what isn't]. One of these is an implementation of R5RS Scheme and the other is a custom dialect called "xtlang" which has explicit memory management to avoid the overhead of garbage collection. Extempore can interact with the world through a Foreign Function Interface.
Apart from the server application itself, a usual installation of extempore also packages libraries written in xtlang, which can be loaded to create certain capabilities. For example, there are libraries dealing with synthesizing of music or rendering of graphics.
Since extempore has a focus on musical programming, the core application also includes an interface to the soundcard, which enables samples to be written from user-code. In this way, the user can create sound. Extempore offers libraries for this purpose, which come with the usual installation.
Extempore does not supply any built-in code editing, the user has to provide his own method of submitting code to the server. Extempore also does not package most C-Libraries it interacts with through FFI, those also have to be provided by the user, if he wishes to peruse them.

### Context
Extempore is mainly used for live performances, especially for music (Algoraves). The programs are often a mix of tested and prepared code as a basis of more ad-hoc and performative code to produce the effects, that the programmer wants to achieve at a given moment.
Most of the performative code is discarded after the performance or kept for historical value.
However it is often necessary to write libraries of auxilliary code to facilitate those performances and these libraries are often developed using a more traditional edit-test cycle. The code of the libraries is also often kept around and built upon for further performances and can be shared and developed with other users of extempore.

### General Application Domain
  - What is typically created in or through this system?
  - What are users trying to accomplish with it?
  - What kind of systems are modified or developed with it (graphical application, client-server architecture, big data, streaming)?
  - ...

### Design Goals of the System
What is the design rational behind the system? Which values are supported by the system? Which parts of the system reflect this rational? For example, auto-testing setups are designed to improve productivity by improving the workflow for TDD through providing feedback on the overall system behavior during programming. Smalltalk systems are designed for expressiveness and enabling understanding through allowing users to directly access and manipulate all runtime objects in the system.

### Type of System
Extempore is most aptly described as an execution environment. The System itself provides an environment in which to run the code of the user, a means for the user to submit said code to the environment as well as capabilities for the code to interact with external software (libraries) and the sound system of the host machine.

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
