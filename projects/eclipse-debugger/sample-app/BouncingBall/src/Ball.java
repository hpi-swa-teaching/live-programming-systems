import java.awt.Color;
import java.awt.Graphics;
import java.awt.Point;
import java.awt.image.BufferedImage;
import java.io.IOException;

public class Ball {
    private Point location;
    private int radius;
    private int dx, dy;
	private Color color;
	private BufferedImage ballImage;

    public Ball(Point l, int directionX, int directionY){
        location = l;
        color = Color.RED;
        radius = 16;
        dx = directionX;
        dy = directionY;
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

    public void move(){
    	getLocation().translate(dx, dy);
    }

	public void paint(Graphics g) {
		g.setColor(getColor());
		g.fillOval(location.x - radius, location.y - radius, 2 * getRadius(), 2 * getRadius());
	}
	

	public void drawBallImage(Graphics g) {
		try {
			if (ballImage == null) {
				ballImage = javax.imageio.ImageIO.read(Ball.class.getResourceAsStream("ball.png"));
			}
			g.drawImage(ballImage, location.x - radius, location.y - radius, 2 * getRadius(), 2 * getRadius(), null);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	public void recflectVertical() {
        dx = -dx;
    }

	public void recflectHorizontal() {
        dy = -dy;
    }
}