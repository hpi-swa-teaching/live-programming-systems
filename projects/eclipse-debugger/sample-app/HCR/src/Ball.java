import java.awt.Color;
import java.awt.Graphics;
import java.awt.Point;

public class Ball {
    private Point location;
    private int radius;
    private int dx, dy;

    public Ball(Point l){
        location = l;
    }

    public Point getLocation() {
        return location;
    }

    public void setLocation(Point location) {
        this.location = location;
    }

    public int getRadius() {
        return 16;
    }

    public Color getColor() {
        return Color.RED;
    }

    public void setMotion(int dx, int dy){
        this.dx = dx;
        this.dy = dy;
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
}
