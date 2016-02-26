package validation;

import java.util.regex.Pattern;
import net.sf.oval.Validator;
import net.sf.oval.configuration.annotation.AbstractAnnotationCheck;
import net.sf.oval.context.OValContext;

public class FigureCheck extends AbstractAnnotationCheck<Figure> {

	final static String mes = "validation.figure";
	static Pattern numberPattern = Pattern.compile("\\d+");

	@Override
	public void configure(Figure figure) {
		setMessage(figure.message());
	}

	public boolean isSatisfied(Object validatedObject, Object value,
			OValContext context, Validator validator) {
		if (value == null || value.toString().length() == 0) {
			return true;
		}
		return numberPattern.matcher(value.toString()).matches();
	}

}
