---
title: Squeak/Smalltalk
author: We
bibliography: squeak.bib
---

# Live Programming Seminar
- Your Name: We
- Your Topic: Squeak/Smalltalk

## About the System itself
Summary of system properties

### System boundaries
*What have you looked at exactly? Mention the boundaries of the system and state what is included and excluded. For example, in Chrome the system might be the developer tools. This ignores any JavaScript libraries which might add additional live capabilities to the tools or to the page currently developed. Another example are auto-testing setups which span a particular editor, testing framework, and auto-testing tool.*

- Unmodified Squeak One-Click 5.1 [link](http://files.squeak.org/5.1/Squeak5.1-16548-32bit/Squeak5.1-16548-32bit-201608171728-Windows.zip)
- Everything within the image, including but not limited to:
  - Morphic with **stepping**
  - Classes without traits
  - Ordinary workspace, class browser, debugger, inspector

### Context
*In which context is the system used? For example: Application development (coding, debugging, exploration), education, art, science (data exploration), simulation, exploration of ideas or data.
Description of user context (professional, amateur, public presentation in front of audience, (un)known requirements, children, ...)*

Squeak/Smalltalk is used in **software development** for all activities. Further, it is often used in **teaching settings** in university classes or schools. It is also used for **research and prototyping** especially for exploring new programming models and tools.

It is usually used for individual work done by one person in front of one computer. Sometimes it is also used in presentation settings for giving talks using interactive visualizations.

### General Application Domain
*What is typically created in or through this system?
What are users trying to accomplish with it?
What kind of systems are modified or developed with it (graphical application, client-server architecture, big data, streaming)?
...*

Squeak/Smalltalk is a general-purpose programming system. However, it is typically used as a teaching environment for software development and as a media/simulation authoring system. Squeak/Smalltalk is not used for processing large data sets and scaling systems.

When used in teaching, users develop graphical end-user desktop applications such as a mail client, a web browser, a Twitter client, or a simulation for digital circuits. The Squeak/Smalltalk environment is used to cover all programming activities. Users can write code, run the application, and inspect runtime state and behavior through debugging tools within the environment. It is also often used to develop games as the accessible graphical abstractions make it easy.

Concrete examples: ...

When used as a media authoring system, it is used for prototyping or exploration. When prototyping it can be used to create graphical objects such as animated drawings or full-fledged presentations.

Concrete examples: ...

### Design Goals of the System
*What is the design rational behind the system? Which values are supported by the system? Which parts of the system reflect this rational? For example, auto-testing setups are designed to improve productivity by improving the workflow for TDD through providing feedback on the overall system behavior during programming.*

Smalltalk systems are designed for expressiveness and enabling understanding through allowing users to directly access and manipulate all runtime objects in the system.

 - "The purpose of the Smalltalk project is to provide computer support for the
creative spirit in everyone." @IngallsDPS
 - "Personal Mastery: If a system is to serve the creative spirit, it must be entirely comprehensible to a single individual." @IngallsDPS
 - "Any barrier that exists between the user and some part of the system will eventually be a barrier to creative expression. Any part of the system that cannot be changed or that is not sufficiently general is a likely source of impediment." @IngallsDPS

Originally, Smalltalk systems were not designed to be specialized application development environments but a general system for users to do their everyday work in. In its oldest form, a Smalltalk system was the operating system of a computer.

The quoted principles lead to the design of the original Smalltalk language and the Smalltalk tools. Squeak/Smalltalk is a direct descended of this original Smalltalk system and thus shares the same rationale.

It shows in the fact that every object in the runtime can be accessed at every time. The user can inspect the state of the object through the inspector tool. One can send any message to any message at any time through using the "Do+it" command for interpreting any visible text. Also, the debugger allows users to interactively run through any piece of code, inspecting and changing and state and code from within the debugger.

### Type of System
*What is the general nature of the system? For example: interactive tool, system, library, language, execution environment, application. What makes the system part of that category?*

Squeak/Smalltalk is a holistic live programming system. It is designed as a combination of a programming language, an execution environment, and a tool set. The liveness is part of the underlying design. The liveness can not be removed from the system without altering its very nature.

---

## Workflows

### Example Workflow
*Description of the major workflow which illustrates all relevant "live programming" features. The workflow description should cover all major elements and interactions available. Augmented by annotated pictures and screencast.*

A central example is creating a bouncing ball simulation within the image using the Morphic graphical framework.

1. We start the image
2. We open the class browser and create a new package named 'BouncingBall'
3. We create a new class in the package called BoBall using the following code:
```
CircleMorph subclass: #BoBall
  instanceVariableNames: ''
  classVariableNames: ''
  poolDictionaries: ''
  category: 'BouncingBall'
```

4. We then implement a simple stepping method:
```
step

  self position: self position + (0@5).
```

5. To see what the ball is currently doing we create a ball and see its behavior. Therefore, we open a workspace and enter ```BoBall new openInWorld```. We then select this code snippet and press "Ctrl+d" on the keyboard. At that moment a ball appears on the screen which moves slowly to the bottom of the screen:
![Bouncing Ball demo 1](./pictures/bouncingBall1.png)

6. We now change the speed of the ball in the code to have a slower motion by changing the method step to:
```
step

  self position: self position + (0@1).
```

7. We then add the logic for bouncing at the world boundaries. Therefore, we extend the step method like this:
```
step

  (self bottom > self owner bottom or: [self top < self owner top])
	  ifTrue: [self direction: (self direction x@ self direction y negated)].

  self position: self position + ((0@10) * self direction).
```

8. After saving the method a debugger window pops up informing us, that the message direction: was not understood. We dismiss the window, add a direction instance variable to the class definition of BouncingBall, right click on the BouncingBall class and select create accessor methods.
```
CircleMorph subclass: #BoBall
	instanceVariableNames: 'direction'
	classVariableNames: ''
	poolDictionaries: ''
	category: 'BouncingBall'
```

9. To make the ball bounce again, we have to click on the ball to pick it up and
click again to drop it again so it starts stepping again. Another debugger shows
up informing us that the UndefinedObject does not understand the message x. We
open the debugger on the step stack frame and find out that the direction
instance variable is nil. We therefore open an inspector on the Ball by
right-clicking on the list entry "self" in the lower left debugger pane and
selecting inspect it. In the lower code pane of the inspector we type ```self
direction: 0@1``` and execute the code with "Ctrl+d". We then proceed the execution
in the debugger by processing "Proceed".

  ![Bouncing Ball demo 1](./pictures/bouncingBall2.png)

10. As the animation is not very smooth, we change the parameters of the movement as follows:
```
step

  (self bottom > self owner bottom or: [self top < self owner top])
	  ifTrue: [self direction: (self direction x@ self direction y negated)].

  self position: self position + ((0@2) * self direction).
```
```
stepTime

  ^ 10
```

11. We also add ...

### Which activities are made live by which mechanisms?
*Description of each concrete activity in the workflow and the underlying liveness mechanism (which is described on a conceptual level and thus could be mapped to other systems)
 Actual interactions
 Feedback mechanism
 If applicable: How is the emergence phase shortened?
 Granularity: For example: Elm can only rerun the complete application*

- Changing the bouncing logic while the ball is moving and we see how the behavior does change:
  - Change to code directly affects the behavior of any running application instance:
    - In Squeak/Smalltalk: If the edited message is regularly executed the change will definitely affect future executions.
    - In Python: We have started the application, then edit the source code and save it but the application behavior is not affected by this change.
- Creating a bouncing ball object: Code evaluation
  - We can select arbitrary text in the image and interpret it as code to be executed
- Setting the direction variable of the bouncing ball through the inspector: Direct manipulation of runtime state
  - We can access any object of the runtime and can change any of its properties and the change takes immediate effect.

### Integration of live activities into overall system
Which activities in the system are not interactive anymore? Which elements can be manipulated in a live fashion and which can not?

How does this workflow integrate with other parts of the system (potentially not live)? What happens at the boundaries between live parts and non-live parts? For example, the interactively assembled GUI is later passed to a compiler which creates an executable form of the GUI.

### Limitations
To which extend can the liveness of one activity be kept up? For example, at which magnitude of data flow nodes does the propagation of values become non-immediate? At which magnitude of elapsed time can the Elm debugger not replay the application immediately anymore or when does it break down? Does an exception break the liveness?
Further, what are conceptual limitations. For example, in a bi-directional mapping system properties of single elements might be modified and reflected in the code. This might not be possible for properties of elements created in loops.

- Changes to initialization code: Tool builder, classes
- Changing the properties does not affect the code

### What happens when the live parts of the system fail/break?
1. What happens when the application under development causes an exception? How does the system handle these exceptions (provide debugger, stop execution, stop rendering, ...)? Does the liveness extend to these exceptions?
2. How can the system itself break? What happens when there is a failure in the system/tool itself?

### Left out features
Which features of the system were not described and why were they left out?

---

## Models

### Mutable or immutable past
*To which category does the system or parts of it belong and why?*

Squeak/Smalltalk is a immutable past system. When changes are applied the execution continues with the modified behavior.

*P. Rein and S. Lehmann and Toni & R. Hirschfeld How Live Are Live Programming Systems?: Benchmarking the Response Times of Live Programming Environments Proceedings of the Programming Experience Workshop (PX/16) 2016, ACM, 2016, 1-8*

### Tanimoto's Level of Live Programming
*To which level of liveness do single activities belong, based on the definitions of the 2013 paper and why?*

- Change to code directly affects the behavior of any running application instance:

  Liveness level 4: as the behavior is modified as soon as the change was made (a valid change to a method happens only when a user saves a method, a keystroke is not a valid change to a method) and the application is kept running
- Code evaluation:

  Liveness level 4: Again this is a modification of the application (aka the whole system) wile it is running and the application was not stopped while it is doing so.
- Direct manipulation of runtime state:

  Liveness level 4: See above as this is a special case of general code evaluation in Squeak/Smalltalk.

*S. L. Tanimoto A perspective on the evolution of live programming Proceedings of the 1st International Workshop on Live Programming, LIVE 2013, 2013, 31-34*

### Steady Frame
Which activities are designed as steady frames based on the formal definition and which are not? For these which are steady frames: How are they designed?

- Change to code directly affects the behavior of any running application instance:

  A steady frame with regard to the running application. The change keeps the ball in its current state and position (i.e. it does not move it in any other way than the way the step method specifies it). The representation is meaningful and steady as the behavior is updated as soon as the step method is again executed. Thus the behavior of the ball is meaningful with respect to the behavior described in the code.
  If there is no running application, then there is also no steady frame as there is no representation of relevant variables in the system.
- Code evaluation in the workspace:

  Generally not a steady frame activity as there is no frame for representing the objects created. When we type ```Object new``` in a Workspace and execute it, then there is no representation of this available whatsoever.
- Direct manipulation of runtime state in the explorer:

  Only a steady frame when the Explorer is used with the watch on changes feature. If this is used, then on every change to the object the explorer updates its view.
  ![Bouncing Ball and explorer](./pictures/bouncingBall3.gif)

*C. M. Hancock Real-Time Programming and the Big Ideas of Computational Literacy Massachusetts Institute of Technology, Massachusetts Institute of Technology, 2003*

### Impact on distances
*How do the activities affect the different distances: temporal, spatial, semantic?*

- Change to code directly affects the behavior of any running application instance:
  - Temporal: Improves on it if there is stepping involved as the code is executed on the next step.
  - Spatial:  No impact
  - Semantic: Improves on it as there are no separate commands required to make the code "alive" in the system. When the code is saved in the browser using the context menu or ctrl+s the code is already part of the running system.
- Code evaluation in the workspace:
  - Temporal: Can improve on it as the result of a computation can be printed right next to the code snippet. However this might not work if the snippet does not have a printable output.
  - Spatial:  Again the "print it" functionality can improve the spatial distance. However, it does not help in general, as events can still happen anywhere on the screen.
  - Semantic: Helps as executing code is simply a command done on any string anywhere in the system through the ctrl+d or ctrl+p command. No extra tools or applications are required.
- Direct manipulation of runtime state in the explorer:
  - Temporal: Helps if the explorer is used which updates automatically and displays the changed state.
  - Spatial:  The inspector and the explorer help as they provide a mean to change runtime state directly next to the affected object.
  - Semantic: To change state in the explorer, programmers just have to put the keyboard focus into the lower pane of the tool window and execute their code using ctrl+d.

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

---

## Benchmark
1. **Unit of change:** Determine relevant units of change from the user perspective. Use the most common ones.
  - Relevant units of change in Smalltalk are: Methods, super class relations, instance variable declarations
  - The most relevant units of change are methods and instance variable declarations
2. **Relevant operations:** Determine relevant operations on these units of change (add, modify, delete, compound operations (for example refactorings)):
  - Operations: Add, modify, remove
  - The most relevant is modify as it occurs most often
3. **Example data:** Select, describe, and provide representative code samples which reflect the complexity or length of a common unit of change of the environment. The sample should also work in combination with any emergence mechanisms of the environment, for example a replay system works well for a system with user inputs and does not match a long-running computation.
  - The Smalltalk image includes approximately 50k methods
4. **Reproducible setup of system and benchmark**
  1. Description of installation on Ubuntu 16.04.1 LTS
    - ...
  2. Description of instrumentation of system for measurements: The measurements should be taken as if a user was actually using a system. So the starting point of a measurement might be the keyboard event of the save keyboard shortcut or the event handler of a save button. At the same time the emergence phase ends when the rendering has finished and the result is perceivable. The run should include all activities which would be triggered when a developer saves a unit of change (for example regarding logging or persisting changes).
    - To measure the adaptation phase duration from the perspective
of a developer, we measured the duration of a call to the callback of the save button, respectively the keyboard shortcut for saving. This corresponds to the interactions of a developer during the ordinary development workflow as the user can only save one method at a time using the standard tool set. As a representative sample of source code we have selected all methods available to us in the Squeak/Smalltalk image at that point. These code samples include methods describing basic system operations such as sorting or filtering collections, as well as methods as parts of larger applications such as the code browser. This resulted in a test set of 50,525 methods. We measured each method 20 times. The specifications of the execution environment are:
      - Squeak 5.0 (Update 15113)
      - Croquet Closure Cog [Spur] VM [CoInterpreterPrimitives VMMaker.oscog-eem.1405]
5. **Results for adaptation and emergence phase**
  ![Bouncing Ball and explorer](./pictures/benchmark1.png)

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
