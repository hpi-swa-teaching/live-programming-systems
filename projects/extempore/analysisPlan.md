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
Extempore is build around a server/client architecture, where the clients submit code via TCP to the server, running extempore. The clients can be anything that supports TCP, even telnet, as the server reads a raw TCP-Stream and evaluates it. To evaluate the code, the server implements two different dialects of LISP, which operate in a semi-shared environment. While functions of the other environment can be called, state is confined to one environment. One of these is an implementation of R5RS Scheme and the other is a custom dialect called "xtlang" which has explicit memory management to avoid the overhead of garbage collection. Extempore can interact with the world through a Foreign Function Interface.
Apart from the server application itself, a usual installation of extempore also packages libraries written in xtlang, which can be loaded to create certain capabilities. For example, there are libraries dealing with synthesizing of music or rendering of graphics.
Since extempore has a focus on musical programming, the core application also includes an interface to the soundcard, which enables samples to be written from user-code. In this way, the user can create sound. Extempore offers libraries for this purpose, which come with the usual installation.
Extempore does not supply any built-in code editing, the user has to provide his own method of submitting code to the server. Extempore also does not package most C-Libraries it interacts with through FFI, those also have to be provided by the user, if he wishes to peruse them.

### Context
Extempore is mainly used for live performances, especially for music (Algoraves). The programs are often a mix of tested and prepared code as a basis of more ad-hoc and performative code to produce the effects, that the programmer wants to achieve at a given moment.
Most of the performative code is discarded after the performance or kept for historical value.
However it is often necessary to write libraries of auxilliary code to facilitate those performances and these libraries are often developed using a more traditional edit-test cycle. The code of the libraries is also often kept around and built upon for further performances and can be shared and developed with other users of extempore.

### General Application Domain
Extempore is typically used to create music or (artistic) graphical effects. This often happens in a live context and with little to no prior code specific to the performance. However, most aritsts do have a library of functions to (re)use in their performances.
Extempore is also used to control and interact with more complex systems, such as physics simulations.
Extempore is therefore mostly used as a tool for experimental coding, that is a tool which enables the user to quickly validate their ideas by putting them into action.


### Design Goals of the System
The main design goal behind the system is to combine the flexibility of a live environment with the performance of a compiled language. This stems from a desire to have a high level of control even in processes which (soft) real-time guarantees and are therefore performance sensitive.

Extempore is also designed to spawn processes on different machines, so as to better balance workloads. This is however a secondary goal which is rooted equally in both primary design goals. Being able to distribute workloads brings all of the performance gains of classical multiprocessing. It also enables the user to write code that makes explicit use of several computers, such as when controlling a swarm of robots.

### Type of System
Extempore is an execution environment. The core is provided by a single binary, which accepts code from external sources and executes it. The code can interact with systems outside of extempore through a foreign function interface. Extempore also implements a way to directly write samples to a sound interface, so that code can produce sound without using the FFI.
Extempore also packages standard library of functions which provide abstractions over commonly used functionalities, so that users do not have to write their own abstractions.

## Workflows
It is usual to change running iterations/recursions to produce different effects. Often this is done with some timing to it, so as to create "sections" in a performance.
The history of entered commands is often visible to the developer in his text editor/ workspace. However there is no explicit representation of the state of the execution environment. It is therefore difficult to build or control complex systems without deeper understanding of their inner workings.

### Example Workflow
Description of the major workflow which illustrates all relevant "live programming" features. The workflow description should cover all major elements and interactions available. Augmented by annotated pictures and screencast.

A typical example is adding an instrument which repeatedly plays a note to the environment.

1. We start the extempore server
```
$ extempore
```
2. We establish a connection with extempore, through which all further code will be send
```
$ telnet localhost 7099
```
3. We load some common libraries that simplify interfacing with the sound system
```
(sys:load "libs/core/instruments.xtm")
```
4. We create the instrument and add it to the Sound Output of Extempore
```
;; define a synth using the provided components
;; synth_note_c and synth_fx
(bind-instrument synth synth_note_c synth_fx)
;; add the instrument to the DSP output sink closure
(bind-func dsp:DSP
	(lambda (in time chan dat)
    (synth in time chan dat)))
(dsp:set! dsp)
```
5. We create a function that outputs the desired sound and schedules itself in the future (temporal recursion)
```
(define melody
	(lambda (time)
    	play-note (time)))
```
6. We call the function, causing the instrument to play a periodical note

### Which activities are made live by which mechanisms?
All activities are live. This means that code commited to the system is possibly compiled and run in the context of the correlating envrionment. The Feedback depends on the code in question.

In a life performane there are typically two groups of people who notice the Feedback from the changes. The first group are the the developers (there is often only one developer) who notices all feedback related to the technical compilation and execution from the code. The second group is the audience, who notice feedback on different channels, mostly sound and music. The feedback the audience recieves are the artifacts the developer wants to produce and often the developer also notices those effects so as to fine tune then and make use of the live nature of extempore.

Feedback can occur over pretty much all channels but there are some standard ways: The extempore console of the running process shows when clients connect/drop out, code is commited, compiled or run as well as the results of the evaluated code. The result of the evaluated code is also send back over the connection to the client so as to notify him of success or failure of his commited code. Since functions can call out to external code (mostly C-Libraries), there can be additional feedback effects. Since extempore is mostly used for live performances involving sound and graphics most feedback for the audience (and the programmer as well) is often acoustic and visual. Depending on the IDE of the Developer, there may be additional feedback based on the returned values from the code execution.

There are three categories in which changes can fall. Those categories are fluid and depend on the state of the environment at the time of execution.
* If the code changes state or functions used in a running temporal recursion, then those changes will be noticeable by the audience as soon as the concerning state or function is evaluated again. The extent and kind of feedback to the audience depends on the involved recursions and symbols. Some changes may be small, such as changing the pitch of a note, while other changes can be big, such as changing the complete instrumentation of a piece or starving the audio buffer due to heavy processing, which results in white noise.
* If the code simply introduces new state into the system, then the change will not be visible to the audience but the developer will be notified via the evaluation result as well as the extempore console (if he has access to it).
* If the code calls a function, possibly starting a new temporal recursion, then the results will be noticeable by the audience

The emergence phase is shortened by the use of compiled for xtlang. This enables functions written in xtlang to be fast enough to be polled for audio (44khz). This can have a drawback: bigger changes to the environment and code can lengthen the adaption time considerably if the compilation of the code in question is complicated. However this problem does not usually occur, since most changes to the code are small and the language contains little compile time computations (TODO: Beleg), so that adaption times are usually short (TODO, benchmark).

Extempore is capable of very granular change, since every definition in the environment can be changed on its own. At the same time an arbitrary number of definitions can be changed at once, possibly even changing the environment to something completely different.

### Integration of live activities into overall system
The System has little interaction surface, only a way to input code and some ways to recieve feedback. These are all "live" in the sense, that they are either necessary (input of commands) or show the current state (evaluation results).

The non-live parts of the system are hidden and basically contained to the framework facilitating the live environment. This environment can not be changed and as such it is not possible to change the language within itself. It is also not possible to change code that is not written in xtlang or scheme, so that most mechanisms to provide feedback (sound, graphics), have a clearly defined API that cannot be changed. The API can however be wrapped in xtlang code and this wrapper can expose new interactions by composing them out of the vocabulary of the external API.

### Limitations
While extempore can behave in an unwanted fashion if it is overloaded and can not meet the soft-real-time criteria, it is still responsive, as the interaction and control of the system is done in a different thread from the execution environment itself. Because of this, the system remains responsive and live even if it is under heavy calculation load. The only exception to this rule would be an endless non-temporal recursion, which would block the execution environment. While new changes could be made, they would not be visible since the main execution thread would be busy with the endless recursion. This problem is mitigated by the fact that all evaluations have a maximum time. So while the unresponsive state may persist for a while it will eventually be resolved by the system. It is also unusual not to use temporal recursion for longer computations, so that the problem does usually not occur.

Extempore has very little limitations in regard to its languages, since they are both derived from LISP and are therefor highly flexible and capable of building all the desired abstractions. There are however only some basic abstractions provided out of the box, so that further affordances for working with liveness have to be built by the user.

### What happens when the live parts of the system fail/break?
When an evaluation causes an exception, the evaluation is stopped and a stacktrace is printed on the system console. Because only the evaluation causing the exception is stopped, other (scheduled) evaluations remain untouched. This means that most of the user application is still running, since there are normally multiple temporal recursions with contained state.

A failure in the tool itself, e.g. due to corrupted memory from FFI, will cause the whole environment to crash. This is due to the low-level nature of the execution environment.

### Left out features
This document mainly describes the extempore execution environment. It does not describe the foreign function interface, because it contributes nothing to the liveness of the system.
The standard library is left out as well, since it is not required to work with extempore and mainly builds upon the basic liveness mechanisms.


---

## Models

### Mutable or immutable past
* Immutable past
* No explicit concept of the past
* Only functions that mutate state/evaluate to something

To which category does the system or parts of it belong and why?

*P. Rein and S. Lehmann and Toni & R. Hirschfeld How Live Are Live Programming Systems?: Benchmarking the Response Times of Live Programming Environments Proceedings of the Programming Experience Workshop (PX/16) 2016, ACM, 2016, 1-8*

### Tanimoto's Level of Live Programming
* Tanimoto Level 4
* Changes to the system are instant (sans a very short adaptation and emergence phase)

To which level of liveness do single activities belong, based on the definitions of the 2013 paper and why?

*S. L. Tanimoto A perspective on the evolution of live programming Proceedings of the 1st International Workshop on Live Programming, LIVE 2013, 2013, 31-34*

### Steady Frame
Which activities are designed as steady frames based on the formal definition and how?

* Constantly meaningfull because of hot swapping
* Possible to change running processes/recursions

*C. M. Hancock Real-Time Programming and the Big Ideas of Computational Literacy Massachusetts Institute of Technology, Massachusetts Institute of Technology, 2003*

### Impact on distances
* Small semantic distance
* Small temporal distance
    * typically small changes
    * fast compilation
    * optimized inner loop
* Not-applicable visual distance
How do the activities affect the different distances: temporal, spatial, semantic?

*D. Ungar and H. Lieberman & C. Fry Debugging and the Experience of Immediacy Communications of the ACM, ACM, 1997, 40, 38-43*

---

## Implementing Liveness

### Extent of liveness in technical artifacts
* Is execution environment => whole system is there to implement liveness
What parts of the system implements the liveness? (Execution environment, library, tool...)

### Mechanisms of Liveness
* REPL
* JIT+Hotswapping
* Temporal Recursion
    * Scheduling
    * End Times
* Compilation in seperate process
* Interaction in seperate process

---
* Benchmark adaptation and emergence for Scheme and Extempore
* Plots with seaborn

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
