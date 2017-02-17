---
title: Eclipse debugger
author: Daniel Stolpe
bibliography: refs.bib
---

# Live Programming Seminar
- Your Name: Daniel Stolpe
- Your Topic: Eclipse Java debugger

>Generally try to drill down on reasons behind properties of the system. Make use of the general observations about the system in arguing about specific properties or mechanisms.

## About the System itself
>Summary of system properties

Eclipse provides IDEs and platforms for many languages and architectures. Eclipse is famous for their Java IDE, C/C++, JavaScript and PHP IDEs built on extensible platforms for creating desktop, Web and cloud IDEs. The Eclipse IDEs are open-source. @RefKey[EclipseOrg]
Eclipse was inspired by the Smalltalk-based VisualAge family of IDEs. @RefKey[EclipseFAQWhereFrom]
The Eclipse Project was originally created by IBM in November 2001 and supported by a consortium of software vendors. The Eclipse Foundation was created in January 2004 as an independent not-for-profit corporation to act as the steward of the Eclipse community. @RefKey[EclipseOrgOrg]

### System boundaries
>What have you looked at exactly? Mention the boundaries of the system and state what is included and excluded. For example, in Chrome the system might be the developer tools. This ignores any JavaScript libraries which might add additional live capabilities to the tools or to the page currently developed. Another example are auto-testing setups which span a particular editor, testing framework, and auto-testing tool.

We are focusing on the Java Debugger of the Eclipse Java IDE. The Java Debugger is part of the "Java Development Tools (JDT) Debug" project. It is implemented on top of the language independent "debug model" provided by the platform debugger which provides language independent facilities for launching programs, source code lookup, breakpoints and debugging UI. @RefKey[EclipseDebug]
We use Java 1.8.0 update 112 as Virtual Machine for running Eclipse itself and the sample application we develop.

### Context
  - In which context is the system used?
    The Eclipse Java debugger is used for debugging Java applications during development within Eclipse or debugging arbitrary Java applications remotely.
     
  - Description of user context (professional, amateur, public presentation in front of audience, (un)known requirements, children, ...)
    The Eclipse Java debugger or the Eclipse Java IDE is not used by a specific user group. Amateurs and students use it to learn coding, professional developers use it to build small and large scale applications. Especially for unexperienced developers, the IDE is useful to immediately see syntactical errors and suggestions on how to fix them. Also code completion features help to explore and find classes and methods. The debugger is useful for every user group to understand and debug runtime behavior.

### General Application Domain
There are different Eclipse IDEs for different programming languages and different purposes. Mainly, these IDEs are used to build desktop, Web and Cloud applications. The Eclipse Java Debugger is used to support the creation of these applications by providing a graphical debugger.

### Design Goals of the System
>What is the design rational behind the system? Which values are supported by the system? Which parts of the system reflect this rational? For example, auto-testing setups are designed to improve productivity by improving the workflow for TDD through providing feedback on the overall system behavior during programming. Smalltalk systems are designed for expressiveness and enabling understanding through allowing users to directly access and manipulate all runtime objects in the system.

Eclipse is a community for individuals and organizations who wish to collaborate on commercially-friendly open source software. Its projects are focused on building an open development platform comprised of extensible frameworks, tools and runtimes for building, deploying and managing software across the lifecycle. An important aspect of Eclipse is the focus on enabling the use of open source technology in commercial software products and services. @RefKey[EclipseOrgOrg]

### Type of System
*What is the general nature of the system? For example: interactive tool, system, library, language, execution environment, application. What makes the system part of that category?*
The Eclipse Java Debugger is an interactive debugger which provides the following debugging functionality @RefKey[EclipseDebug]:

  - Launching of a Java VM in either run or debug mode
  - Attaching to a running Java VM
  - Expression evaluation in the context of a stack frame
  - Scrapbook pages for interactive Java code snippet evaluation
  - Dynamic class reloading where supported by Java virtual machine (since Java 1.4)

---

## Workflows
Writing code in Eclipse is supported by syntax highlighting, code completion and lots of other feedback mechanisms to detect syntactical errors. The views and tools are pluggable so that you can adjust the IDE to your needs. When debugging, the Eclipse Debugger provides some liveness features to replace code of methods and lots of different ways to inspect runtime state. These features are mainly used to find bugs faster, but not to develop applications at runtime. In following exemplary workflow, we try to develop the application as live as possible, keeping the application running as long as possible while writing the source code.

### Example Workflow
>Description of the major workflow which illustrates all relevant "live programming" features. The workflow description should cover all major elements and interactions available. Augmented by annotated pictures and screencast.

A good example to demonstrate live programming features and its limitations is creating a bouncing ball simulation with Java 2D drawing features.

1. We start Eclipse (in this test case Neon.1a Release (4.6.1))
2. We choose from the menu bar "File" > "New" > "Java Project"
3. We choose a project name, e.g. "BouncingBall" and click "Finish"
4. In the "Package Explorer" we right-click on our new project "BouncingBall" and choose "New" > "Class". In the opening Dialog we enter the name "Main" and select the checkbox "public static void main(String[] args)" and click "Finish"
5. We add three more classes, but leaving the checkbox for creating a main method unchecked. The classes are "Ball", "BallPanel" and "BallDialog"
6. We select the class "Ball" and add some fields and methods to it by adjusting (in the following, "adjusting" always is writing the code and saving the changes by pressing *Ctrl+S*) the code like this:
```java
import java.awt.Color;
import java.awt.Graphics;
import java.awt.Point;

public class Ball {
  private Point location;
  private int radius;
  private Color color;

  public Ball(Point l){
      location = l;
      color = Color.RED;
      radius = 16;
  }

  public Point getLocation() {
      return location;
  }

  public int getRadius() {
      return radius;
  }

  public Color getColor() {
      return color;
  }
}
```

7. Now we want to draw a ball, so we need some code to create a Window in Java. We adjust the class "Main" to:
```java
import javax.swing.JFrame;

public class Main {

  public static void main(String[] args) {
      javax.swing.SwingUtilities.invokeLater(new Runnable() {
          public void run() {
              createAndShowGUI();
          }
      });
  }
  
  private static void createAndShowGUI() {
      JFrame frame = new JFrame("Bouncing ball");
      frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
      
      BallPanel ballPanel = new BallPanel();
      ballPanel.setOpaque(true);
      frame.setContentPane(ballPanel);

      frame.pack();
      frame.setLocationRelativeTo(null);
      frame.setVisible(true);
  }
}
```

8. We also adjust the class "BallPanel" to:
```java
import java.awt.Dimension;
import java.awt.Point;
import javax.swing.JPanel;

public class BallPanel extends JPanel {
  private Ball ball;
  
  public BallPanel() {
    setPreferredSize(new Dimension(600, 400));
    ball = new Ball(new Point(50,50));
  }
}
```

9. We right-click on the class "Main" and select "Debug As" > "1 Java Application". A Window opens, but no ball is visible yet.
10. We need to add the actual drawing methods, so keeping the window open, we switch to the Eclipse IDE and add the following method to "BallPanel":
```java
  @Override
  public void paint(Graphics g){
      super.paint(g);
      ball.paint(g);
  }
```
"Graphics" is unknown to the compiler, so we press *Ctrl+Shift+O* to organize our imports and select "java.awt.Graphics". We save our changes which leads to the following pop-up:
![HCR failed - Add method not implemented](./res/pics/hcr_failed_add_method_not_implemented.png)
We click "Terminate", because we need to add more methods. We need to implement the paint-method for the class "Ball". We hover with the mouse cursor over the red-underlined code snippet "ball.paint(g);" and select from the displayed pop-up "Create method ...". Now we can add the following code to the auto generated method and save the changes:
```java
  g.setColor(getColor());
  g.fillOval(100, 100, 50, 50);
```

11. We run the application again in "Debug"-mode by pressing "F11". Now, the ball is drawn:
![Ball is drawn on panel](./res/pics/ball_is_drawn.png)
We want to adjust the `paint(...)` method, so that the actual properties of the ball are used to draw and not the hard coded values. So we keep the window open again and switch to the IDE. We change the "paint"-method to:
```java
  g.setColor(getColor());
  g.fillOval(location.x - radius, location.y - radius, 2 * getRadius(), 2 * getRadius());
```
We save and switch to our ball-window. We can not see any change, because the paint method was not triggered again yet. We enforce a repaint by grabbing the edge of the window with the mouse and make it a bit larger. Now we see the ball changing in size and position.

12. We want to make the ball start moving and adjust the "BallPanel" code to:
```java
[...]
public BallPanel() {
    setPreferredSize(new Dimension(600, 400));
    ball = new Ball(new Point(50,50), 8, 2);
    
    new Thread(new Runnable() {
      @Override
      public void run() {
        while (true) {
          if (BallPanel.this.getParent().isVisible()) {
            BallPanel.this.stepTheBall();
          }

          try {
            Thread.sleep(20);
          } catch (InterruptedException e) {
            e.printStackTrace();
          }
        }
      }
  }).start();
}
  
public void stepTheBall() {
  ball.move();
  repaint();
}

[...]
```
When saving, the notification pops up again, that Hot Code Replace is not possible. We terminate the running application.
We adjust the code of "Ball" to:
```java
[...]
public class Ball {
  private Point location;
  private int radius;
  private int dx, dy;
  private Color color;

  public Ball(Point l, int directionX, int directionY){
      location = l;
      color = Color.RED;
      radius = 16;
      dx = directionX;
      dy = directionY;
  }

  public void move(){
      getLocation().translate(dx, dy);
  }

[...]
```

13. We run the application again in "Debug"-mode by pressing "F11". We see the ball moving from the top left corner, to the right and leaving the window. To bounce the ball from the right side, we adjust the "stepTheBall"-method:
```java
public void stepTheBall() {
  ball.move();
  
  Point position = ball.getLocation();

  if (position.x > getWidth()) {
    ball.recflectVertical();
  }

  repaint();
}
```
After saving a pop-up appears:
![Confirm perspective switch](./res/pics/confirm_perspective_switch.png)
We choose "Yes". In the Debug-Perspective we can hover over the red-underlined code snippet `ball.recflectVertical();` to get the info, that this method is missing in class "Ball". We click on "Create method ...". In the class "Ball", we implement the method as follows:
```java
public void recflectVertical() {
    dx = -dx;       
}
```
Saving leads again to the information that Hot Code Replace is not possible when adding methods. This time, we click "Restart". The ball bounces from the right side, but not from the others.

14. We add the remaining checks:
```java
public void stepTheBall() {
    ball.move();
    
    Point position = ball.getLocation();

    if (position.x > getWidth() || position.x < 0) {
      ball.recflectVertical();
    }

    if (position.y > getHeight() || position.y < 0) {
      ball.recflectHorizontal();
    }
    repaint();
}
```
and add `recflectHorizontal()` to "Ball":
```java
public void recflectHorizontal() {
    dy = -dy;       
}
```
Again we have to restart the application. Now the ball bounces from all sides.

15. The bouncing does not look very nice, because the reflection is done based on the top left corner of the ball. We adjust the code of `stepTheBall()` to:
```java
if (position.x + ball.getRadius() > getWidth() || position.x - ball.getRadius() < 0) {
  ball.recflectVertical();
}

if (position.y + ball.getRadius() > getHeight() || position.y - ball.getRadius() < 0) {
  ball.recflectHorizontal();
}
```
The changes are immediately visible without the need to restart.

16. Now, we want to change the direction vector of our ball, so that it moves very slow, but without terminating the application. We place a breakpoint in the method `move()` by double clicking next to the line number. The debugger immediately holds at the breakpoint:
![Breakpoint halt](./res/pics/breakpoint_halt.png)
We can hover over the variables `dx` and `dy` to view their current values:
![Hover variable](./res/pics/hover_variable.png)
We could also select `dx`, right-click the selection and click "Watch" in the context menu. This will open the "Expression View", where we can see the value of `dx`. Unfortunately we cannot change it.
![Expression view](./res/pics/expression_view.PNG)
To change the value of `dx`, we click on "Window" > "Show View" > "Variables" in the menu bar. In this view we expand "this" to see all fields of the current "Ball" instance:
![Variables view](./res/pics/variables_view.png)
Now we can double click into the "Value" column and change the value of `dx` to `1`. Then we remove the breakpoint by double clicking next to the line number in the editor and press "F8" to resume the execution.
The ball is moving very slow now.

17. Finally, we want to replace the single colored ball with an image of a football. We switch back to the "Java Perspective" and add a PNG image to our Java project's source folder named `ball.png`.
![Adding image](./res/pics/add_image.png)
At the moment, we do not know exactly, how to load and draw an image in Java and want to try out some ideas. We switch back to the "Debug Perspective" and set a breakpoint at `g.setColor(getColor());` in method `public void paint(Graphics g)` of class `Ball.java`.
We press "F11" to start debugging.
The execution stops at our breakpoint. To get a scrapbook- or workspace-like environment, we click in the menu bar "Window" > "Show View" > "Display". In this view we have access to all variables available in the context of the current executed method. We type `g.` and get some code completion suggestions. We type `g.image` to find a method which can draw an image.
![Code completion for g.image](./res/pics/code_completion_image.png)
We decide on the fifth entry which needs an instance of `Image`, the drawing position and width and height of the image.
Now we need an instance of `Image`. We know that there is a class `ImageIO` which can read images. We type `ImageIO` and trigger code completion by pressing *Ctrl+Space* to get the full qualified name `javax.imageio.ImageIO` of the class. We trigger code completion again by typing `javax.imageio.ImageIO.read`. There is a method accepting an `InputStream`, which we will use.
![Code completion for ImageIO.read](./res/pics/code_completion_imageio_read.png)
To get an input stream for our image `ball.png` we can use the system class loader by typing `Ball.class.getResourceAsStream("ball.png")`. To test this code snippet, we select the whole line of code we want to execute and press *Ctrl+Shift+D*. The result is:
![Evaluation of code creating an InputStream from ball.png](./res/pics/ball_image_loading_eval.png)
Now, that we have a valid input stream, we can test drawing an image. We combine our code snippets to `g.drawImage(javax.imageio.ImageIO.read(Ball.class.getResourceAsStream("ball.png")), 10, 10, null)`, select the line of code and press *Ctrl+Shift+D*.
![Evaluation of code drawing ball.png](./res/pics/ball_drawing_eval.png)
The result is `(boolean) true` which means, that the drawing was successful. We switch to our running application but cannot see any image of a ball, because the actual drawing is not done yet. We press "F8" to continue execution. The program stops again at our breakpoint at `g.setColor(getColor());`. We switch again to our running application and now we see the image of the ball drawn at position (10, 10).
![Application drawing ball.png](./res/pics/ball_image_drawn.png)
Now we can replace the actual drawing code of method `public void paint(Graphics g)` with `g.drawImage(javax.imageio.ImageIO.read(Ball.class.getResourceAsStream("ball.png")), location.x - radius, location.y - radius, 2 * getRadius(), 2 * getRadius(), null);`.
The code is not valid yet and by hovering over the red-line code we see that a try-catch-statement is needed. We add it by selecting "Surround with try/catch".
![Try-catch needed](./res/pics/add_try_catch.png)
The drawing code looks like this:
```java
public void paint(Graphics g) {
  try {
    g.drawImage(javax.imageio.ImageIO.read(Ball.class.getResourceAsStream("ball.png")), location.x - radius, location.y - radius, 2 * getRadius(), 2 * getRadius(), null);
  } catch (IOException e) {
    e.printStackTrace();
  }
}
```
Now we remove the breakpoint, save our changes and press "F8" to resume execution. The application is still running and we can switch to it and see the bouncing image of a ball.
![Final application with image of ball drawn](./res/pics/ball_image_drawn_correctly.png)

18. Now we want to show another tool, the "Scrapbook Page", which has not fit into the workflow shown above. It provides the same liveness features like the "Display View", but can be used as a standalone workspace to evaluate Java code. We click on "File" > "New" > "Other..." and in the wizard we select "Java" > "Java Run/Debug" > "Scrapbook Page" and click "Next". We enter a file name, e.g. "workspace" and click "Finish". An empty "Scrapbook Page" opens. We can enter arbitrary Java Code and evaluate it by selecting the code and pressing *Ctrl+Shift+D*.
![Scrapbook Page](./res/pics/scrapbook_page.png)

### Which activities are made live by which mechanisms?
>Description of each concrete activity in the workflow and the underlying liveness mechanism (which is described on a conceptual level and thus could be mapped to other systems)
- Actual interactions
- Feedback mechanism
- If applicable: How is the emergence phase shortened?
- Granularity: For example: Elm can only rerun the complete application

Step 11 of the example workflow shows the first liveness activity. The program is running in "Debug"-mode and we change code in the body of the `paint(...)` method. Saving these changes via the Eclipse Debugger triggers Hot Code Replace (HCR). The method body of the `paint(...)` is replaced without restarting the application. But the change is only visible when the `paint`-method is triggered e.g. by resizing the window.

In step 15, HCR is triggered again by saving a Java file. This change is immediately visible, due to stepping implemented via a separate Thread which enforces a repaint every 20ms, which provides immediate visual feedback for the programmer.

In step 16, a Breakpoint pauses the execution of threads at a specific line of code. The Eclipse debugger allows us to inspect the state of the stack trace of the paused thread, e.g. by hovering over a variable to see its value in a pop-up window. If the value is an object, it is displayed via its `toString()` method. Furthermore the object's instance variables are displayed in a foldable tree structure, but without the ability to change them.
Next, we open a "Variables View" to examine all local variables available in the current stack frame including `this`. We also open the "Expressions View" to watch the resulting value of arbitrary valid Java expressions as long as the thread is paused.

In step 16 we also modify runtime state via the "Variables View".

In step 17 we evaluated code snippets to explore the File-IO- and Image-drawing-API. Runtime state manipulation and code evaluation via the Eclipse debugger are only possible because a context (variables of the current stack frame) is provided when pausing execution.

In step 18 we evaluated code snippets in a "Scrapbook Page". The first time we evaluate a code snippet, a separate JVM process is started to provide the runtime context. We can see this process in the "Debug View".
![Scrapbook Page process](./res/pics/scrapbook_page2.png)

### Integration of live activities into overall system
>Which activities in the system are not interactive anymore? Which elements can be manipulated in a live fashion and which can not?

>How does this workflow integrate with other parts of the system (potentially not live)? What happens at the boundaries between live parts and non-live parts? For example, the interactively assembled GUI is later passed to a compiler which creates an executable form of the GUI.

The Eclipse Debugger is seamlessly integrated into the Eclipse IDE. Eclipse provides a "Debug Perspective" consisting of a source code editor in the center, surrounded by different views to inspect VM-threads, variables and console output.
![Eclipse Debug Perspective with default configuration](./res/pics/debugger_perspective_default.png)
The source code editor is the same as in the default "Java Perspective", i.e. when halting at a Breakpoint, you can inspect variables like in the "Debug Perspective" in step 16 by hovering over them with the mouse cursor. Debugging and using liveness features like Hot Code Replace is independent of the current "Perspective".
If no context is provide by halting at a Breakpoint, the features to inspect state are disabled, i.e. the "Variables View" and "Expressions View" are empty.


### Limitations
>To which extend can the liveness of one activity be kept up? For example, at which magnitude of data flow nodes does the propagation of values become non-immediate? At which magnitude of elapsed time can the Elm debugger not replay the application immediately anymore or when does it break down? Does an exception break the liveness?
Further, what are conceptual limitations. For example, in a bi-directional mapping system properties of single elements might be modified and reflected in the code. This might not be possible for properties of elements created in loops.

A conceptional limitation to live programming with Eclipse (or Java in general) is the differentiation between running an application in Default- or "Debug"-mode. When starting in "Run"-mode, no debugging features are available, i.e. Hot Code Replace or state inspection/modification via Breakpoints is not possible.

When running in "Debug"-mode, there are still some limitations which we describe in the following, regarding the example workflow.

In step 10 and 12 Hot Code Replace is not applicable, because adding methods is not implemented in the JVM of Java 8 and earlier. @RefKey[EclipseFAQHCR]
In step 13 and 14 HCR is again not possible for the same reasons, but we chose to restart the application with one click instead of terminating it.

The default JVM implementations (e.g. HotSpot and OpenJDK) of Java 8, which are optimized for speed and consistency, do not implement the full feature-set described in the JVM HotSwap specification (@RefKey[HotSwapSpec]).
The supported features can be inspected in Eclipse by opening the properties of a running VM:
![VM capabilities](./res/pics/vm_capabilities.PNG)
In the image we see that Hot Code Replace is supported, but method addition or arbitrary class redefinition is not supported by that Java HotSpot VM implementation.
In general HCR is also not possible when altering code of the last method on the stack (e.g. the main-method), because this stack frame cannot be popped to reenter the modified method afterwards.

Another limitation is also based on the fact, that execution needs to halt at a Breakpoint, to inspect/modify state. Finding the relevant context to put the Breakpoint can be difficult. E.g. if we want to change the speed of the bouncing ball, we have to find the relevant lines of code which provides access to a reference of the ball. When found, execution still has to reach this Breakpoint. This might be no problem in a small application, but the more complex a system becomes, the more difficult it will be to find the right lines of code.


### What happens when the live parts of the system fail/break?
1. What happens when the application under development causes an exception? How does the system handle these exceptions (provide debugger, stop execution, stop rendering, ...)? Does the liveness extend to these exceptions?

    Java has a built-in exception handling, allowing the Eclipse Debugger to halt execution when an unhandled exception is thrown in "Debug"-mode (e.g. an ArithmeticException caused by "division by zero"). If the the error can be fixed by modifying state via the "Variables View" or behavior via HCR, execution can be resumed.
    If HCR fails due to running into the limitations described before, e.g. adding a method, the Eclipse debugger handles this exception by letting the developer choose from three options: Continue, Terminate and Restart.
    ![Add method not implemented](./res/pics/hcr_failed_add_method_not_implemented.png)
    
      + Continue
      The developer can continue the execution, but there are no valid debug information for the changed stack frames available. You can continue stepping into and over method calls or resume normal code execution, but the changes made to the main method, will not take place, until restarting the debugging session.

      + Terminate
      Stops the current debugging session.

      + Restart
      Restarts the debugging session, so that all changes will be included in the new session.

2. How can the system itself break? What happens when there is a failure in the system/tool itself?
    In some cases, when saving invalid Java code (like invalid method signatures), the Eclipse debugger is unable to properly handle these exceptions and can only notify the user via the Eclipse Debugger that something went wrong.
    ![Exception unable to process](./res/pics/liveness_fails.PNG)
    In such a case, the application freezes and you can only terminate the running application via the Eclipse debugger.


### Left out features
Which features of the system were not described and why were they left out?

- Remote Debugging
  The JVM allows us to debug programs remotely, e.g. a Java application running in an application server. The underlying concepts for debugging such an application remotely with the Eclipse Debugger are the same for debugging an application running from inside the Eclipse IDE. Therefore we left this feature out.

---

## Models

### Mutable or immutable past
>To which category does the system or parts of it belong and why?

The Eclipse debugger is an immutable past tool. HCR only allows to replace behavior (class methods) that will be executed from now on. If you replace code of a method currently executed, the stack frame will be reset. Side-effects of already executed code cannot be reverted automatically.

*P. Rein and S. Lehmann and Toni & R. Hirschfeld How Live Are Live Programming Systems?: Benchmarking the Response Times of Live Programming Environments Proceedings of the Programming Experience Workshop (PX/16) 2016, ACM, 2016, 1-8*

### Tanimoto's Level of Live Programming
>To which level of liveness do single activities belong, based on the definitions of the 2013 paper and why?

- Behavior manipulation by HCR - Liveness level 4
  The behavior of the running application is immediately changed after the user made the change. The application is kept running. A valid change to a class happens only when a user saves the class' source file from inside the Eclipse IDE. A keystroke is not a valid change to a source file.

- Code evaluation - Liveness level 4
  Code evaluation is only possible when providing a context by pausing a thread of the application in "Debug"-mode. A thread is paused when reaching a Breakpoint. All other application threads and the Eclipse Debugger are kept running. When evaluating code snippets, the result is displayed immediately as long as the evaluated snippet has a sub-second execution time.
  We argue, that this is still liveness level 4, because Tanimoto writes:
  > In level 4, the computer wouldn’t wait but would keep running the program, modifying the behavior as specified by the programmer as soon as changes were made. @RefKey[Tanimoto2013PEL]
  In general the Java program is kept running and the program evaluates the snippets as soon as the programmer triggers the evaluation by pressing a keyboard shortcut.
  
- Runtime state manipulation - Liveness level 4
  The argumentation for liveness level 4 is the same as for code evaluation. Runtime state manipulation is only possible when providing a context by pausing a thread, but the application and the Eclipse Debugger are kept running. A state modification is applied as soon as the programmer triggers the change, for example via the "Variables View".


*S. L. Tanimoto A perspective on the evolution of live programming Proceedings of the 1st International Workshop on Live Programming, LIVE 2013, 2013, 31-34*

### Steady Frame
>Which activities are designed as steady frames based on the formal definition and how?

A Steady Frame is defined as:
>"[...] a way of organizing and representing a system or activity, such that (I) relevant variables can be seen and/ or manipulated at specific locations within the scene (the framing part), and (II) these variables are defined and presented so as to be constantly present and constantly meaningful (the steady part)." @RefKey[Hancock2003RTP]

The "Debug View" is a Steady Frame, because it displays constantly meaningful information about the state of the running application and its threads.
![Steady Frame Debug View](./res/pics/steady_frame_debug_view.PNG)
When halting one thread at a Breakpoint, additional information, like the stack trace, are available.
![Steady Frame Debug View Breakpoint](./res/pics/steady_frame_debug_view_breakpoint.PNG)

The "Variables View" and "Expression View" of the Eclipse Debugger can be seen as *frames* based on the formal definition. However, they are only *steady* when a context is provided, i.e. when halting at a Breakpoint.
Without a context, these views do not show any runtime state information.
The empty "Variables View":
![Steady Frame Variables View](./res/pics/steady_frame_variables_view.PNG)

The "Expressions View" without values:
![Steady Frame Expressions View](./res/pics/steady_frame_expressions_view.PNG)

When halting at a Breakpoint, they turn into Steady Frames.
The filled "Variables View":
![Steady Frame Variables View Breakpoint](./res/pics/steady_frame_variables_view_breakpoint.PNG)

The "Expressions View" with values:
![Steady Frame Expressions View Breakpoint](./res/pics/steady_frame_expressions_view_breakpoint.PNG)

When the programmer expands the tree structure to explorer variables and values, this expansion state is kept when stepping through a method. Only when we step into another method or return from it, the tree is collapsed again.

*C. M. Hancock Real-Time Programming and the Big Ideas of Computational Literacy Massachusetts Institute of Technology, Massachusetts Institute of Technology, 2003*

### Impact on distances
How do the activities affect the different distances: temporal, spatial, semantic?

- Temporal
    Changing behavior by applying Hot Code Replace has no temporal distance. The adaptation time is less than 1s (see chapter *Benchmarking*).

    Changing state via the "Variables View" has no temporal distance. Modifying a variable in this view is done in less than 100ms (see chapter *Benchmarking*).

    Evaluating code snippets using the "Display View", "Scrapbook Page" or the code editor's in-place features has no temporal distance regarding the adaptation time. The emergence time is depending on the execution time of the evaluated code snippet only.

    In all cases, the Eclipse Debugger allows the user to recognize a causality between triggering the change and seeing the effects.

- Spatial and Semantic
    In the Eclipse IDE, all views are pluggable. This implies that the spatial and semantic distance among different views is highly depending on the graphical arrangement.
    In the default setup of the "Debug Perspective", the code editor is placed in the center, the "Debug View" to inspect the state of VM-Threads in the upper left and all the other state inspection tools like "Variables View" and "Expressions View" are grouped in a tab view in the upper right corner. The "Display View" is grouped in a tab view at the bottom. This approach already implies a spatial distances by physically separating these tools. The programmer has to deal with a cognitive "ping-pong" effect @RefKey[Ungar1997DEI].
    The "Variables View" for example allows to inspect and change the values of available variables at runtime, but the programmer needs to move the focus from the editor to a different view, find the corresponding variable entry in the tree list and move the focus back to the code.
    
    The Eclipse Debugger tries to reduce these spatial distance by integrating parts of the features of these views directly into the code editor.
    To inspect a variable faster and with reduced spatial and semantic distance, the programmer can hover with the cursor over a single variable in the code editor to spawn an inspection pop-up window in-place.
    However, the inspection is read-only. The programmer still has a semantic and spatial distance, when he wants to change the value after inspecting it.

    To evaluate code snippets, the programmer can add the snippet to the "Expressions View" or evaluate it in the "Display View" with some spatial and semantic distance. Again, to reduced these distances, the evaluation and result-printing can be done directly in the code editor by selecting a code snippet and pressing a keyboard shortcut.

    On a different level, spatial distances exists between the Eclipse Debugger and the running graphical Java application itself. When the IDE is in full-screen mode, you have to permanently switch between application and Debugger, bringing the one or the other window to front.
    This strict separation between Debugger and application causes also a huge semantic distance. To inspect state of the running application, the programmer needs to find the relevant code snippet to place a Breakpoint. Then the application still needs to reach this Breakpoint to provide the context for state inspection.

    A large semantic distance exists regarding the differentiation between starting an application in "Run"- or "Debug"-mode. Only in "Debug"-mode the programmer can debug an application and make use of the liveness features. If a programmer is not used to always start an application in "Debug"-mode, a restart is needed to enable debugging features when needed.

*D. Ungar and H. Lieberman & C. Fry Debugging and the Experience of Immediacy Communications of the ACM, ACM, 1997, 40, 38-43*

---

## Implementing Liveness

### Extend of liveness in technical artifacts
>What parts of the system implements the liveness? (Execution environment, library, tool...)

The liveness of the Eclipse Debugger is implemented in different layers. At the lowest level, the JVM defines a Java Platform Debugger Architecture (JPDA) for debuggers in development environments @RefKey[JPDA]. The Eclipse Platform Debugger builds upon these interfaces to provide language independent facilities for launching programs, source code lookup, breakpoints and debugging UI @RefKey[EclipseDebug]. At the highest level, the Eclipse Java Debugger implements the language specific part.

### Implementations of single activities
>Description of the implementation of live activities. Each implementation pattern should be described through its concrete incarnation in the system (including detailed and specific code or code references) and as an abstract concept.

The sample code snippets shown in the following belong to the Eclipse git repository `git://git.eclipse.org/gitroot/platform/eclipse.platform.releng.aggregator.git` and its submodules with revision tag `Y20170105-1040`.
We simplified the code snippets to highlight the most important parts by leaving out unimportant lines (indicated by '...'). These snippets are only a glimpse into the complex implementation of the Eclipse Debugger and we do not claim it to be complete.

#### Hot Code Replace
Changing a method's body and saving the corresponding class file triggers a recompilation of the file. The resulting bytecode is submitted via a debug channel to the JVM of the running application. There, the bytecode of the affected method body is replaced on the fly. No restart is required.

![HCR schema](./res/pics/HCR_schema.PNG)

HCR has been specifically added as a standard technique to Java to facilitate experimental development and to foster iterative trial-and-error coding. HCR is reliably implemented only on 1.4.1 VMs and later. @RefKey[EclipseFAQHCR]

**Abstract form**
Hot Code Replace is a debugging technique whereby a Java Debugger transmits new class files over the debugging channel to another JVM.

**Implementation reference**
The following code snippet shows the method `redefineTypesJDK` which does the actual call to the JVM to replace bytecodes (`vm.redefineClasses(typesToBytes);`). It is part of the class `JavaHotCodeReplaceManager` in package `org.eclipse.jdt.internal.debug.core.hcr`.
Corresponding Java file: http://git.eclipse.org/c/gerrit/jdt/eclipse.jdt.debug.git/tree/org.eclipse.jdt.debug/model/org/eclipse/jdt/internal/debug/core/hcr/JavaHotCodeReplaceManager.java?h=Y20170105-1040

```java
/**
 * Replaces the given types in the given JDK-compliant debug target.
 * 
 * This method is to be used for JDK hot code replace.
 */
private void redefineTypesJDK(JDIDebugTarget target, List<IResource> resources,
    List<String> qualifiedNames) throws DebugException {
  if (target.supportsJDKHotCodeReplace()) {
    target.setHCROccurred(true);
    Map<ReferenceType, byte[]> typesToBytes = getTypesToBytes(target, resources,
        qualifiedNames);
    try {
      VirtualMachine vm = target.getVM();
      if (vm == null) {
        target.requestFailed(
            JDIDebugHCRMessages.JavaHotCodeReplaceManager_Hot_code_replace_failed___VM_disconnected__2,
            null);
      }
      vm.redefineClasses(typesToBytes);
    } catch (...) {
      ...
    }
  } else {
    target.notSupported(JDIDebugHCRMessages.JavaHotCodeReplaceManager_does_not_support_hcr);
  }
}
```

The next code snippet shows the method `doHotCodeReplace` which calls `redefineTypesJDK` shown above. It also notifies listeners, if HCR has succeeded or failed. It is also part of the class `JavaHotCodeReplaceManager`

```java
/**
 * Perform a hot code replace with the given resources. For a JDK 1.4
 * compliant VM this involves:
 * <ol>
 * <li>Popping all frames from all thread stacks which will be affected by
 * reloading the given resources</li>
 * <li>Telling the VirtualMachine to redefine the affected classes</li>
 * <li>Performing a step-into operation on all threads which were affected
 * by the class redefinition. This returns execution to the first (deepest)
 * affected method on the stack</li>
 * </ol>
 * For a J9 compliant VM this involves:
 * <ol>
 * <li>Telling the VirtualMachine to redefine the affected classes</li>
 * <li>Popping all frames from all thread stacks which were affected by
 * reloading the given resources and then performing a step-into operation
 * on all threads which were affected by the class redefinition.</li>
 * </ol>
 * 
 * @param targets
 *            the targets in which to perform HCR
 * @param resources
 *            the resources which correspond to the changed classes
 */
private void doHotCodeReplace(List<JDIDebugTarget> targets, List<IResource> resources,
    List<String> qualifiedNames) {
  ...
  while (...) {
    JDIDebugTarget target = ...
    List<IThread> poppedThreads = new ArrayList<IThread>();
    target.setIsPerformingHotCodeReplace(true);
    try {
      boolean framesPopped = false;
      if (target.canPopFrames()) {
        // JDK 1.4 drop to frame support:
        // JDK 1.4 spec is faulty around methods that have
        // been rendered obsolete after class redefinition.
        // Thus, pop the frames that contain affected methods
        // *before* the class redefinition to avoid problems.
        try {
          attemptPopFrames(target, resourcesToReplace,
              qualifiedNamesToReplace, poppedThreads);
          framesPopped = true; // No exception occurred
        } catch (...) {
          ...
        }
      }
      ...
      if (target.supportsJDKHotCodeReplace()) {
        redefineTypesJDK(target, resourcesToReplace,
            qualifiedNamesToReplace);
      } else if (target.supportsJ9HotCodeReplace()) {
        redefineTypesJ9(target, qualifiedNamesToReplace);
      }
      if (containsObsoleteMethods(target)) {
        fireObsoleteMethods(target);
      }
      try {
        if (target.canPopFrames() && framesPopped) {
          // Second half of JDK 1.4 drop to frame support:
          // All affected frames have been popped and the classes
          // have been reloaded. Step into the first changed
          // frame of each affected thread.
          // must re-set 'is doing HCR' to be able to step
          target.setIsPerformingHotCodeReplace(false);
          attemptStepIn(poppedThreads);
        } else {
          // J9 drop to frame support:
          // After redefining classes, drop to frame
          attemptDropToFrame(target, resourcesToReplace,
              qualifiedNamesToReplace);
        }
      } catch (...) {
        ...
      }
      fireHCRSucceeded(target);
    } catch (DebugException de) {
      // target update failed
      fireHCRFailed(target, de);
    }
    // also re-set 'is doing HCR' here in case HCR failed
    target.setIsPerformingHotCodeReplace(false);
    target.fireChangeEvent(DebugEvent.CONTENT);
  }
  ...
}
```

Saving changes by pressing a keyboard shortcut (which triggers Hot Code Replace in the end) is done in the class `SaveHandler`. This class is used as an entry point to measure HCR performance in chapter *Benchmarking*. The class belongs to package `org.eclipse.ui.internal.handlers`.
Corresponding Java file: http://git.eclipse.org/c/gerrit/platform/eclipse.platform.ui.git/tree/bundles/org.eclipse.ui.workbench/Eclipse%20UI/org/eclipse/ui/internal/handlers/SaveHandler.java?h=Y20170105-1040

```java
public class SaveHandler extends AbstractSaveHandler {

  ...

  @Override
  public Object execute(ExecutionEvent event) {
    ISaveablePart saveablePart = getSaveablePart(event);
    ...
    // if editor
    if (saveablePart instanceof IEditorPart) {
      IEditorPart editorPart = (IEditorPart) saveablePart;
      IWorkbenchPage page = editorPart.getSite().getPage();
      page.saveEditor(editorPart, false);
      return null;
    }
    ...
    return null;
  }

  ...

}
```

#### Variable inspection and modification
The "Variable View" allows inspection and modification of runtime state, when halting at a Breakpoint. To modify a variable, the programmer clicks into the "Value" column which provides an input field, enters the new value or expression as String and commits the change by pressing Enter or by leaving the field. The String is sent to the other JVM where it is evaluated in the context of a pausing thread. The result is stored in the corresponding variable.
The "Expressions View" is based on the same implementations for evaluating expressions used by the "Variables View". Therefore, we only describe the "Variables View" implementation in the following.

**Abstract form**
Variable inspection is done by requesting runtime state information via the debugging channel to another JVM. Variable modification is done by sending an expressions via the debugging channel to another JVM where the variable is changed to the result of the evaluated expression.

**Implementation reference**
The "Variable View" logic is implemented in the class `JavaObjectValueEditor` in package `org.eclipse.jdt.internal.debug.ui.actions`. A variable modification is done in method `setValue`, shown in the next snippet. The expressions is evaluated and the value is stored in the corresponding variable afterwards.
Corresponding Java file: http://git.eclipse.org/c/gerrit/jdt/eclipse.jdt.debug.git/tree/org.eclipse.jdt.debug.ui/ui/org/eclipse/jdt/internal/debug/ui/actions/JavaObjectValueEditor.java?h=Y20170105-1040

```java
/**
 * Evaluates the given expression and sets the given variable's value
 * using the result.
 * 
 * @param variable the variable whose value should be set
 * @param expression the expression to evaluate
 * @throws DebugException if an exception occurs evaluating the expression
 *  or setting the variable's value
 */
protected void setValue(final IVariable variable, final String expression){
    UIJob job = new UIJob("Setting Variable Value"){ 
        @Override
        public IStatus runInUIThread(IProgressMonitor monitor) {
            try {
                IValue newValue = evaluate(expression);
                if (newValue != null) {
                    variable.setValue(newValue);
                } else {
                    variable.setValue(expression);
                }
            } catch (DebugException de) {
                handleException(de);
            }
            return Status.OK_STATUS;
        }
    };
    job.setSystem(true);
    job.schedule();
}
```

#### Code evaluation
The "Display View", the "Scrapbook Page" and the code editor allow evaluating code snippets when a context is provided. When pressing a keyboard shortcut while a code snippet is selected, the Debugger submits the snippet via the debugging channel to another JVM to evaluate it in the context of a paused thread of that JVM. Therefore a Breakpoint is needed. The "Display View" and the code editor allow evaluating code snippets only when the application is already halting at a Breakpoint defined by the programmer. The "Scrapbook Page" requires also a Breakpoint, but solves this problem by starting a dummy application in a separate JVM and setting a Breakpoint automatically the first time the programmer triggers a snippet evaluation. The result of the evaluation is transfered back to the calling JVM so that the Eclipse Debugger can display the result finally.

**Abstract form**
Code evaluation is done by sending code snippets via the debugging channel to another JVM. There the code snippet is evaluated in the context of a paused thread of that JVM. The result is sent back to the calling JVM.

**Implementation reference**
The codebase for evaluating code snippets is the same for the "Display View", the "Scrapbook page" and the code editor. "Display View" and "Scrapbook Page" also share the same `JavaSnippetEditor` implementation in package `org.eclipse.jdt.internal.debug.ui.snippeteditor`. The following code snippet shows the method `evalSelection`. It starts the evaluation process by launching a separate JVM if there is none available from a running debugging session and finally triggers the evaluation engine of the other JVM.
Corresponding Java file: http://git.eclipse.org/c/gerrit/jdt/eclipse.jdt.debug.git/tree/org.eclipse.jdt.debug.ui/ui/org/eclipse/jdt/internal/debug/ui/snippeteditor/JavaSnippetEditor.java?h=Y20170105-1040

```java
public void evalSelection(int resultMode) {
  if (!isInJavaProject()) {
    reportNotInJavaProjectError();
    return;
  }
  if (isEvaluating()) {
    return;
  }
  
  checkCurrentProject();
  
  evaluationStarts();

  fResultMode= resultMode;
  buildAndLaunch();
  
  if (fVM == null) {
    evaluationEnds();
    return;
  }
  fireEvalStateChanged();

  ITextSelection selection= (ITextSelection) getSelectionProvider().getSelection();
  String snippet= selection.getText();
  fSnippetStart= selection.getOffset();
  fSnippetEnd= fSnippetStart + selection.getLength();
  
  evaluate(snippet);      
}
```

The following code snippet shows parts of the "Scrapbook Page" implementation to start a separate JVM to provide an evaluation context.
First of all, the class `ScrapbookLauncher` in package `org.eclipse.jdt.internal.debug.ui.snippeteditor` is responsible for managing the separate JVM.
Corresponding Java file: http://git.eclipse.org/c/gerrit/jdt/eclipse.jdt.debug.git/tree/org.eclipse.jdt.debug.ui/ui/org/eclipse/jdt/internal/debug/ui/snippeteditor/ScrapbookLauncher.java?h=Y20170105-1040

```java
  /**
   * Launches a VM for the given scrapbook page, in debug mode.
   * Returns an existing launch if the page is already running.
   * @param page the scrapbook page file
   * 
   * @return resulting launch, or <code>null</code> on failure
   */
  protected ILaunch launch(IFile page) {
              
    ...
    
    IDebugTarget vm = getDebugTarget(page);
    if (vm != null) {
      //already launched
      return vm.getLaunch();
    }
    
    IJavaProject javaProject= JavaCore.create(page.getProject());
      
    URL jarURL = null;
    try {
      jarURL = JDIDebugUIPlugin.getDefault().getBundle().getEntry("snippetsupport.jar"); 
      jarURL = FileLocator.toFileURL(jarURL);
    } catch (...) {
      ...
    }
    
    List<IRuntimeClasspathEntry> cp = ...
    try {
      ...
      IRuntimeClasspathEntry[] classPath = ...
      
      return doLaunch(javaProject, page, classPath, jarFile);
    } catch (CoreException e) {
      JDIDebugUIPlugin.errorDialog("Unable to launch scrapbook VM", e); 
    }
    return null;
  }
```

The next snippet shows the class `ScrapbookMain` in package `org.eclipse.jdt.internal.debug.ui.snippeteditor`. It implements the `main` method containing the eval-loop and the method `nop` where a Breakpoint is set by the `ScrapbookLauncher` to halt thread execution to get a context for code evaluation.
Corresponding Java file: http://git.eclipse.org/c/gerrit/jdt/eclipse.jdt.debug.git/tree/org.eclipse.jdt.debug.ui/Snippet%20Support/org/eclipse/jdt/internal/debug/ui/snippeteditor/ScrapbookMain.java?h=Y20170105-1040

```java
/**
 * Support class for launching a snippet evaluation.
 * ...
 */
public class ScrapbookMain {
  
  public static void main(String[] args) {

    URL[] urls= getClasspath(args);
    if (urls == null) {
      return;
    }
    
    while (true) {
      try {
        evalLoop(urls);
      } catch (...) {
        ...;
      }
    }
  
  }
  
  static void evalLoop(URL[] urls) throws ClassNotFoundException, NoSuchMethodException, InvocationTargetException, IllegalAccessException {
    ...
    ClassLoader cl= new URLClassLoader(urls, null);
    Class<?> clazz= cl.loadClass("org.eclipse.jdt.internal.debug.ui.snippeteditor.ScrapbookMain1"); 
    Method method= clazz.getDeclaredMethod("eval", new Class[] {Class.class}); 
    method.invoke(null, new Object[] {ScrapbookMain.class});
  }
  
  /**
   * The magic "no-op" method, where {@link org.eclipse.jdt.internal.debug.ui.snippeteditor.ScrapbookLauncher#createMagicBreakpoint(String)} sets a
   * breakpoint.
   * <p>
   */
  public static void nop() {
    try {
      Thread.sleep(100);
    } catch(InterruptedException e) {
    }
  }
  
  ...
}
```

### Within or outside of the application
>For each activity: Does the activity happen from within the running application or is it made possible from something outside of the application? For example, a REPL works within a running process while the interactions with an auto test runner are based on re-running the application from the outside without any interactive access to process internal data.

All liveness activities are triggered from outside the running application. The Eclipse Debugger makes use of the JVM's debugging channel to initiate the activity. However, the liveness is applied inside the application's JVM. The available liveness features depend on the debugger's and the application's JVM implementation.

---

## Benchmark
//TODO
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
>Everything that is particular about the environment and does not fit into the pre-defined categories mentioned so far.

**@Stefan/Patrick: Ist hier die richtige Stelle, um Projekte wie DCEVM zu erwähnen, die die JVM erweitern, um Hot Code Replace auch für das Hinzufügen von Methoden usw. zu ermöglichen?**

Eclipse is highly depending on the implemented liveness-features of the underlying VM.

The programmer has to explicitly start the application in Debug mode to enable the described liveness features. From my own experience having used Eclipse some years to develop server-side Java code in a company, many developers do not run the application in Debug mode by default. Only if there is a bug and you try to find it with the help of the Eclipse Debugger, you run the application in Debug mode. You find the bug, terminate the execution, fix the source code and restart the application.

To sum it up Live Programming in the Eclipse Debugger is mainly used for faster debugging, but not for application development. The result of Live Programming is an iteration of the source code, not the artifact created with Live Programming.



## Style Template
- Denote headings with #
- You can use any text highlighting, list types, and tables
- Insert images in the following way:
  `![This is the caption](/url/of/image.png)`
- Insert videos or web resources as markdown links
- Insert references as: `@RefKey` and supply a bib file
- No HTML tags please

- JRebel https://zeroturnaround.com/software/jrebel/ (closed source)
- JRebel HCR https://zeroturnaround.com/rebellabs/reloading_java_classes_401_hotswap_jrebel/
- DCEVM http://dcevm.github.io/
- JPDA HotSwap specs https://docs.oracle.com/javase/8/docs/technotes/guides/jpda/enhancements1.4.html#hotswap


`mvn clean verify -Pbuild-individual-bundles`
build SaveHandler: /c/e/eclipse.platform.ui/bundles/org.eclipse.ui.workbench
build debug stuff: /c/e/eclipse.jdt.debug/org.eclipse.jdt.debug
snippet editor C:\e\eclipse.jdt.debug\org.eclipse.jdt.debug.ui\Snippet Support\org\eclipse\jdt\internal\debug\ui\snippeteditor