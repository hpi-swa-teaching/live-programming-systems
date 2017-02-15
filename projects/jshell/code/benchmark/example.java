
import java.io.PrintWriter;
import java.io.FileWriter;
import java.io.File;
import java.io.IOException;
import java.io.Serializable;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;


import java.io.RandomAccessFile;
import java.nio.MappedByteBuffer;
import java.nio.channels.FileChannel;


public class BenchmarkTimer{


    public final static int MEMORY_POSITION_JSHELLTIMER = 1;
    public final static int MEMORY_POSITION_EXAMPLETIMER = 0;


    public static volatile BenchmarkTimer timer;

    private static final long serialVersionUID = 1L;
    private long startTime = 0;
    private boolean measureTime = false;

    public BenchmarkTimer(){
        this.startTime = 0;
    }

    public static BenchmarkTimer getTimer(){
        
        if(BenchmarkTimer.timer == null){
            BenchmarkTimer.timer = new BenchmarkTimer();
        }
        
        return timer;
    }

    public void startTimer(){   
        if(!measureTime){
            return;
        }
        this.startTime = System.nanoTime();
    }


     public void endTimerAdaptationPhase(){
        if(!measureTime){
            return;
        }

        
        long endTime = System.nanoTime();
        double div = endTime - this.startTime;

        PrintWriter writer = null;
        try{
            FileWriter fw = new FileWriter("./benchmark/benchmarkResults.txt", true);
            writer = new PrintWriter(fw);
            writer.print(div/1e6);

        } catch (IOException e) {
            System.out.println("Couldn't write benchmark results to a file... ");
            System.out.println(e);
            System.exit(0);
        } finally {
            if (writer != null) {
                writer.close();
            }
        }

        this.startTime = endTime;
        this.stopExternalTimer(BenchmarkTimer.MEMORY_POSITION_JSHELLTIMER);
        this.startExternalTimer(BenchmarkTimer.MEMORY_POSITION_EXAMPLETIMER);
    }


    public void endTimerEmergencePhase(){

        long endTime = System.nanoTime();
        double div = endTime - this.startTime;

        PrintWriter writer = null;
        try{
            FileWriter fw = new FileWriter("./benchmark/benchmarkResults.txt", true);
            writer = new PrintWriter(fw);
            writer.println(";" + div/1e6);

        } catch (IOException e) {
            System.out.println("Couldn't write benchmark results to a file... ");
            System.out.println(e);
            System.exit(0);
        } finally {
            if (writer != null) {
                writer.close();
            }
        }

        this.startTime = endTime;    
    }




    public void setMeasureTime(boolean value){
        this.measureTime = value;
    }

    public void startExternalTimer(int position){
        byte trueValue = 1;
        TimerSync.startExternalTimer(trueValue,position);
    }

    public void stopExternalTimer(int position){
        byte falseValue = 0;
        TimerSync.startExternalTimer(falseValue,position);
    }

    public static boolean shouldStart (int position){
        return TimerSync.getValueFromFile(position);
    }


    public static void resetFile(){
         byte reset = 0;
            try {
                File file = new File("./benchmark/timersync.ser");
                file.delete();
                file.createNewFile();

        } catch (Exception e) {
            e.printStackTrace();
        }
        TimerSync.startExternalTimer(reset,BenchmarkTimer.MEMORY_POSITION_JSHELLTIMER);
        TimerSync.startExternalTimer(reset,BenchmarkTimer.MEMORY_POSITION_EXAMPLETIMER);
    }

}




class TimerSync{

    private boolean wait = true;
    private static MappedByteBuffer out;



    TimerSync(boolean value){
        this.wait = value;
    }

    public boolean getWait(){
        return this.wait;
    }

    public void setWait(boolean value){
        this.wait = value;
    }


    public static MappedByteBuffer getMemoryMap(){
        if(out == null){
            try {
                int CHUNKSIZE = 10;
                RandomAccessFile memoryMappedFile = new RandomAccessFile("./benchmark/timersync.ser", "rw");
                out = memoryMappedFile.getChannel().map(FileChannel.MapMode.READ_WRITE, 0, CHUNKSIZE);
                } catch (Exception e) {
                    System.out.println("Not able to map file into memory on getMemoryMap... ");
                    System.out.println(e);
                    System.exit(0);
                }
        }
        return out;

    }

     public static void startExternalTimer(byte value, int position){
        try {
                MappedByteBuffer memory = TimerSync.getMemoryMap();
                synchronized(memory){
                    memory.position(position);
                    memory.put(value);
                }
                

        } catch (Exception e) {
           System.out.println("Not able to map file into memory on startExternalTimer... ");
           System.out.println(e);
           System.exit(0);
        }
    }


    public static boolean getValueFromFile(int position){
        try {

                MappedByteBuffer memory = TimerSync.getMemoryMap();

                synchronized(memory){
                      memory.position(position);
                      byte output = memory.get();
                    if(output == 1){
                        return true;
                  } else{
                       return false;
                    }
                }
              
        } catch (Exception e) {
            System.out.println("Not able to map file into memory on getValueFromFile... ");
            System.out.println(e);
            System.exit(0);
        }
        return false;
    }

}



import java.awt.Point;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.Rectangle;

public class Ball {
	 private Point location;
	    private int radius;
	    private int dx = 3, dy = -3;

	    public Ball(Point l){
	    	radius = 16;
	        location = l;
	    }

	    public Point getLocation() {
	        return location;
	    }

	    public void setLocation(Point location) {
	        this.location = location;
	    }

	    public int getRadius() {
	        return radius;
	    }

	    public Color getColor() {
	        return Color.RED;
	    }

	    public void setMotion(int dx, int dy){
	        this.dx = dx;
	        this.dy = dy;
	    }
	    
	    public Point getMotion(){
	    	return new Point(this.dx, this.dy);
	    }

	    public void move(){
	        location.translate(dx, dy);
	    }

	    public void moveTo(int x, int y){
	        location.move(x, y);
	    }

	    public void paint(Graphics g) {
	        g.setColor(getColor());
	        g.fillOval(location.x-radius, location.y-radius, 2*getRadius(), 2*getRadius());
	    }

	    public void recflectHorizontal() {
	        dy = -dy;       
	    }   

	    public void recflectVertical() {
	        dx = -dx;       
	    }
	    
	    public Rectangle getBounds() {
			return new Rectangle(location.x, location.y, getRadius(), getRadius());
		}
}


import java.awt.Rectangle;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.event.KeyEvent;


public class Racquet {
	private static final int Y = 330;
	private int width = 60;
	private int height = 10;
	
	
	int x = 0;
	private int xa = 0;
	
	private int racquetSpeed = 10;
	
	int gameWidth;
	
	public Racquet(int gameWidth) {
		this.gameWidth = gameWidth;
	}

	public void move() {
		if (x + xa > 0 && x + xa < gameWidth - getWidth())
			x = x + xa;
	}

	public void paint(Graphics g) {
		g.setColor(getColor());
		g.fillRect(x, Y, getWidth(), getHeight());
	}

	public void keyReleased(KeyEvent e) {
		xa = 0;
	}
	
	public Color getColor() {
	   return Color.BLUE;
	}
	  
	public void keyPressed(KeyEvent e) {
		if (e.getKeyCode() == KeyEvent.VK_LEFT)
			xa = -racquetSpeed;
		if (e.getKeyCode() == KeyEvent.VK_RIGHT)
			xa = racquetSpeed;
	}
	

	public Rectangle getBounds() {
		return new Rectangle(x, Y, getWidth(), getHeight());
	}

	public int getTopY() {
		return Y;
	}
	
	public int getWidth(){
		return this.width;
	}
	
	public int getHeight(){
		return this.height;
	}
}


import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Point;
import javax.swing.JPanel;
import java.awt.event.KeyListener;
import java.awt.event.KeyEvent;
import javax.swing.JOptionPane;

public class GamePanel extends JPanel{
	private static final long serialVersionUID = 1L;
	public final int FRAMEWIDTH = 600;
    public final int FRAMEHEIGHT = 400;
    private Ball ball;
    private Racquet racquet;

    private long benchmarkCount = 0;
    
    public GamePanel() {
    	setPreferredSize(new Dimension(FRAMEWIDTH, FRAMEHEIGHT));
    	ball = new Ball(new Point(150,250));
    	racquet = new Racquet(FRAMEWIDTH);
	}
    
    @Override
    public void paint(Graphics g){
        super.paint(g);
        ball.paint(g);
        racquet.paint(g);
    }
    
	public void play() {

		ball.move();
		racquet.move();
		
		Point position = ball.getLocation();
		if(position.y >= FRAMEHEIGHT - ball.getRadius()){
			//this.gameOver();
		}

		if (position.x > FRAMEWIDTH - ball.getRadius() || position.x < ball.getRadius()) {
			ball.recflectVertical();
		}

		if (position.y > FRAMEHEIGHT - ball.getRadius() || position.y < ball.getRadius()) {
			ball.recflectHorizontal();
		}
		
		if(collision()){
			Point p = new Point();
			p.setLocation(ball.getLocation().x, racquet.getTopY() - ball.getRadius());
			ball.setLocation(p);
			ball.recflectHorizontal();
		}

		repaint();
		this.waitForBenchmark(); 
		
	}

	private void waitForBenchmark(){
		if(benchmarkCount % 2 == 0){
			while(ball.getColor() != Color.BLUE){
			}
		} else{
			while(ball.getColor() != Color.RED){
			}
		}
		
		
		BenchmarkTimer timer = BenchmarkTimer.getTimer();
		timer.endTimerEmergencePhase();

		benchmarkCount++;
		timer.stopExternalTimer(BenchmarkTimer.MEMORY_POSITION_EXAMPLETIMER);
		timer.startExternalTimer(BenchmarkTimer.MEMORY_POSITION_JSHELLTIMER);
	}

	private boolean collision() {
		return this.racquet.getBounds().intersects(this.ball.getBounds());
	}
	
	private void gameOver() {
		JOptionPane.showMessageDialog(this, "Game Over", "Game Over", JOptionPane.YES_NO_OPTION);
		ball.moveTo(FRAMEWIDTH/2,FRAMEHEIGHT/2);
ball.recflectHorizontal();
	}

	public Ball getBall(){
		return this.ball;	
	}

}

import javax.swing.JFrame;
import java.awt.event.*;

 	 JFrame frame = new JFrame("Modified Pong");

	        //Create and set up the content pane.
	        GamePanel newContentPane = new GamePanel();
	        newContentPane.setOpaque(true); //content panes must be opaque
	        frame.add(newContentPane);

		frame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);

	        //Display the window.
	        frame.pack();
	        frame.setLocationRelativeTo(null);
	        frame.setVisible(true);
		
		BenchmarkTimer.resetFile();
		BenchmarkTimer timer = BenchmarkTimer.getTimer();
		BenchmarkTimer.getTimer().setMeasureTime(true);

		boolean runThread = true;

		Thread thread = new Thread(new Runnable() {	
				@Override
				public void run() {

						while(runThread) {

							while(!timer.shouldStart(BenchmarkTimer.MEMORY_POSITION_EXAMPLETIMER)){
							}

        					timer.startTimer();

							newContentPane.play(); 
						
						try {
							Thread.sleep(200);
						} catch (InterruptedException e) {
							e.printStackTrace();
						}
						
						}

				

					}
			});

	


		frame.addWindowListener(new WindowAdapter() {
 		 public void windowClosing(WindowEvent e) {
   			runThread = false;
  			}
		});

		thread.start();
