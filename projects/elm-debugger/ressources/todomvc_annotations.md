0:05  
Something seems to be wrong.

0:10  
We inspect the message history, to what we have done from the applications perspective.

0:12  
By stepping through the message history (left) we can go back in time and see which interactions we performed.
The user interface in the browser changes accordingly.
Furthermore, we can inspect the state (right).

0:18  
The message history shows, that the applications adds an entry when space is pressed.
But we want to add the entry on enter.

0:21  
We search for the piece of source code that is responsible for this behavior.

0:25  
We change the keycode from 32 (space) to 13 (cr).
Afterwards we save the changes source code.
The application automatically reloads.

0:35  
By generating more input we find out if our change had the intended effect.
Now we can type spaces in the input field without adding items.
Pressing space finally adds the item.
