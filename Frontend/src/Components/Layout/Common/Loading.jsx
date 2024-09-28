import { cn } from "@/lib/utils";  // Assuming 'cn' is a utility for handling class names
import PropTypes from 'prop-types'; // Import PropTypes for prop validation

// Spinner component definition
export default function ClassySpinner({ size = 'medium', className }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
      <div
        className={cn(
          "relative",   // Basic styling for the spinner
          size === 'small' && "w-6 h-6",   // Conditional classes based on the size prop
          size === 'medium' && "w-12 h-12",
          size === 'large' && "w-16 h-16",
          className     // Any additional classes passed through the className prop
        )}
      >
        {/* Layers of the spinner with different animation durations */}
        <div className="absolute inset-0 border-t-2 border-r-2 border-primary rounded-full animate-spin"></div>
        <div className="absolute inset-0 border-t-2 border-r-2 border-primary rounded-full animate-spin" style={{ animationDuration: '1.5s' }}></div>
        <div className="absolute inset-0 border-t-2 border-r-2 border-primary rounded-full animate-spin" style={{ animationDuration: '2s' }}></div>
      </div>
    </div>
  );
}

// Add prop types validation
ClassySpinner.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string,
};
