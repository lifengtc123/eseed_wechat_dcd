package validation;

import java.util.regex.Pattern;
import net.sf.oval.Validator;
import net.sf.oval.configuration.annotation.AbstractAnnotationCheck;
import net.sf.oval.context.OValContext;

public class MobileCheck extends AbstractAnnotationCheck<Mobile> {

	final static String mes = "validation.mobile";
	static Pattern mobilePattern = Pattern.compile("^(13|15|18)\\d{9}$");

	@Override
	public void configure(Mobile mobile) {
		setMessage(mobile.message());
	}

	public boolean isSatisfied(Object validatedObject, Object value,
			OValContext context, Validator validator) {
		if (value == null || value.toString().length() == 0) {
			return true;
		}
		return mobilePattern.matcher(value.toString()).matches();
	}

}
