import java.awt.BorderLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.BorderFactory;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.border.Border;

public class DialogDemo extends JPanel {
	private static final long serialVersionUID = 1L;
//	private static final float fontSize = 30.0f;
//	private JFrame frame;
	
	public DialogDemo(JFrame frame) {
		super(new BorderLayout());
//        this.frame = frame;
//        
//        JPanel frequentPanel = createSimpleDialogBox();
//        Border padding = BorderFactory.createEmptyBorder(20,20,5,20);
//        frequentPanel.setBorder(padding);
//        
//        add(frequentPanel, BorderLayout.PAGE_START);
        add(new BallPanel(), BorderLayout.CENTER);
	}

//	private JPanel createSimpleDialogBox() {
//		JPanel pane = new JPanel(new BorderLayout());
//        JLabel label = new JLabel("The magic of Hot-Code-Replace");
//        label.setFont(label.getFont().deriveFont(fontSize));
//		JButton showItButton = new JButton("Show magic!");
//		showItButton.setFont(showItButton.getFont().deriveFont(fontSize));
//        showItButton.addActionListener(new ActionListener() {
//			
//			@Override
//			public void actionPerformed(ActionEvent e) {
//				DialogDemo.this.doClick();
//			}
//		});
//		pane.add(label, BorderLayout.PAGE_START);
//		pane.add(showItButton, BorderLayout.PAGE_END);
//		return pane;
//	}

//	protected void doClick() {
//		JLabel label = new JLabel("This is magic!");
//		label.setFont(label.getFont().deriveFont(fontSize));
//		JOptionPane.showMessageDialog(frame, label);
//	}
}
