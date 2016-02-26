function MultiSelector(list_target, max,name) {
	this.list_target = list_target;
	this.count = 0;
	this.id = 0;
	this.name = name;
	if (max) {
		this.max = max;
	} else {
		this.max = -1;
	}
	/**  
 
     * Add a new file input element  
 
     */
	this.addElement = function (element) {
        // Make sure it's a file input element   
		if (element.tagName == "INPUT" && element.type == "file") { 
            // Element name -- what number am I?  
			element.name = this.name;
            // Add reference to this object   
			element.multi_selector = this;
            // What to do when a file is selected   
			element.onchange = function () {  
                // New file input   
				var new_element = document.createElement("input");
				new_element.type = "file";
				new_element.size = "1";
				new_element.className = "addfile";
                // Add new element   
				this.parentNode.insertBefore(new_element, this);   
                // Apply 'update' to element   
				this.multi_selector.addElement(new_element);   
                // Update list   
				this.multi_selector.addListRow(this);   
                // Hide this: we can't use display:none because Safari doesn't like it  
				this.style.position = "absolute";
				this.style.left = "-1000px";
			};   
  
            // If we've reached maximum number, disable input element   
			if (this.max != -1 && this.count >= this.max) {
				element.disabled = true;
			}   
            // File element counter   
			this.count++;   
  
            // Most recent element   
			this.current_element = element;
		} else {   
  
            // This can only be applied to file input elements!   
			alert("Error: not a file input element");
		}
	};
	/**  
 
     * Add a new row to the list of files  
 
     */
	this.addListRow = function (element) {   
        // Row div   
		var new_row = document.createElement("div"); 
        // Delete button   
		var new_row_href = document.createElement("a");
		new_row_href.href = "javascript:void(0);";
    	new_row_href.innerHTML = "移除";
        // References   
		new_row.element = element;
        // Delete function   
		new_row_href.onclick = function () { 
            // Remove element from form   
			this.parentNode.element.parentNode.removeChild(this.parentNode.element);   
            // Remove this row from the list   
			this.parentNode.parentNode.removeChild(this.parentNode);   
            // Decrement counter   
			this.parentNode.element.multi_selector.count--;   
            // Re-enable input element (if it's disabled)   
			this.parentNode.element.multi_selector.current_element.disabled = false;   
			return false;
		};   
        // Set row value   
		new_row.innerHTML = element.value + " ";   
        // Add button   
		new_row.appendChild(new_row_href);   
        // Add it to the list   
		this.list_target.appendChild(new_row);
	};
}

 