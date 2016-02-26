package validation;

import java.util.regex.Pattern;
import net.sf.oval.Validator;
import net.sf.oval.configuration.annotation.AbstractAnnotationCheck;
import net.sf.oval.context.OValContext;

public class TelephoneCheck extends AbstractAnnotationCheck<Telephone> {

	final static String mes = "validation.telephone";
	static Pattern telephonePattern = Pattern.compile("^(\\d{7}|\\d{8}|\\d{3}-\\d{8}|\\d{4}-\\d{8}|\\d{4}-\\d{7}|\\d{3}-\\d{7})(-\\d{2,8})?$");

	@Override
	public void configure(Telephone telephone) {
		setMessage(telephone.message());
	}

	public boolean isSatisfied(Object validatedObject, Object value,
			OValContext context, Validator validator) {
		if (value == null || value.toString().length() == 0) {
			return true;
		}
		return telephonePattern.matcher(value.toString()).matches();
	}

}
