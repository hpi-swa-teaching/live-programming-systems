import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Point;

import javax.swing.JPanel;

public class BallPanel extends JPanel {
	private static final long serialVersionUID = 1L;
	public final int FRAMEWIDTH = 600;
    public final int FRAMEHEIGHT = 400;
    private Ball ball;
    
    public BallPanel() {
    	setPreferredSize(new Dimension(FRAMEWIDTH, FRAMEHEIGHT));
    	ball = new Ball(new Point(50,50));
    	ball.setMotion(8, -6);
    	
		new Thread(new Runnable() {
			@Override
			public void run() {
				while(true) {
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
    
    @Override
    public void paint(Graphics g){
        super.paint(g);
        ball.paint(g);
    }
    
	public void stepTheBall() {
		ball.move();

		Point position = ball.getLocation();

		if (position.x > FRAMEWIDTH - ball.getRadius()*2 || position.x < 0) {
			ball.recflectVertical();
		}

		if (position.y > FRAMEHEIGHT - ball.getRadius()*2 || position.y < 0) {
			ball.recflectHorizontal();
		}
		repaint();
	}
}
