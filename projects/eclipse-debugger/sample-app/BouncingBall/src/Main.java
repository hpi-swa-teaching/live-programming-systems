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
