import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Point;

import javax.swing.JPanel;

public class BallPanel extends JPanel {
    private Ball ball;
    
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
		
		Point position = ball.getLocation();
		if (position.x + ball.getRadius() > getWidth() || position.x - ball.getRadius() < 0) {
			ball.recflectVertical();
		}

		if (position.y + ball.getRadius() > getHeight() || position.y - ball.getRadius() < 0) {
			ball.recflectHorizontal();
		}
		repaint();
	}
    
    @Override
    public void paint(Graphics g){
        super.paint(g);
        ball.paint(g);
    }
}
