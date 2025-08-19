"use client"
import React, { useState, useCallback } from 'react';
import { generateCalendarYear } from './utils/calendarUtils';
import YearView from './YearView';
import MonthView from './MonthView';
import CalendarControls from './CalendarControls';
import html2canvas from 'html2canvas';
import './calendar.css';

export type ViewMode = 'year' | 'month';

interface CalendarViewProps {
  year: number;
  initialView?: ViewMode;
  initialMonth?: number;
}

const CalendarView: React.FC<CalendarViewProps> = ({
  year,
  initialView = 'year',
  initialMonth
}) => {
  // Get current month as default
  const getCurrentMonth = () => {
    if (initialMonth !== undefined) return initialMonth;
    const now = new Date();
    return now.getFullYear() === year ? now.getMonth() : 0;
  };
  
  const [viewMode, setViewMode] = useState<ViewMode>(initialView);
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  
  // Generate calendar data
  const calendarData = generateCalendarYear(year);
  
  // Handle view mode changes
  const handleViewChange = useCallback((mode: ViewMode) => {
    setViewMode(mode);
  }, []);
  
  // Handle month selection
  const handleMonthSelect = useCallback((month: number) => {
    setSelectedMonth(month);
    setViewMode('month');
  }, []);
  
  // Handle month navigation
  const handleMonthNavigate = useCallback((direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (selectedMonth === 0) {
        // Don't navigate to previous year for now
        return;
      }
      setSelectedMonth(selectedMonth - 1);
    } else {
      if (selectedMonth === 11) {
        // Don't navigate to next year for now
        return;
      }
      setSelectedMonth(selectedMonth + 1);
    }
  }, [selectedMonth]);
  
  // Handle back to year view
  const handleBackToYear = useCallback(() => {
    setViewMode('year');
  }, []);
  
  // Get current view title
  const getViewTitle = () => {
    if (viewMode === 'year') {
      return `Calendar ${year}`;
    } else {
      const monthName = calendarData.months[selectedMonth].name;
      return `${monthName} ${year}`;
    }
  };
  
  // Export calendar as image
  const exportAsImage = useCallback(() => {
    const calendarElement = document.querySelector('.calendar-content');
    if (!calendarElement) return;
    
    // Create modal container
    const modalContainer = document.createElement('div');
    modalContainer.style.position = 'fixed';
    modalContainer.style.top = '0';
    modalContainer.style.left = '0';
    modalContainer.style.width = '100%';
    modalContainer.style.height = '100%';
    modalContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    modalContainer.style.display = 'flex';
    modalContainer.style.justifyContent = 'center';
    modalContainer.style.alignItems = 'center';
    modalContainer.style.zIndex = '9999';
    modalContainer.style.padding = '20px';
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = 'white';
    modalContent.style.borderRadius = '8px';
    modalContent.style.padding = '20px';
    modalContent.style.maxWidth = '90%';
    modalContent.style.maxHeight = '90%';
    modalContent.style.overflow = 'auto';
    modalContent.style.display = 'flex';
    modalContent.style.flexDirection = 'column';
    modalContent.style.alignItems = 'center';
    modalContent.style.gap = '15px';
    
    // Create loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.textContent = 'Generating calendar image...';
    loadingIndicator.style.padding = '20px';
    loadingIndicator.style.fontSize = '16px';
    modalContent.appendChild(loadingIndicator);
    
    // Add modal to document
    modalContainer.appendChild(modalContent);
    document.body.appendChild(modalContainer);
    
    // Close modal when clicking outside
    modalContainer.addEventListener('click', (e) => {
      if (e.target === modalContainer) {
        document.body.removeChild(modalContainer);
      }
    });
    
    // Use html2canvas to generate image
    html2canvas(calendarElement as HTMLElement, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      onclone: (clonedDoc) => {
        // Force black text color in cloned document for better visibility
        const allElements = clonedDoc.querySelectorAll('*');
        allElements.forEach((el) => {
          const element = el as HTMLElement;
          const styles = element.style;
          const computedStyle = window.getComputedStyle(element);
          
          // Check if element has white text color
          if (computedStyle.color === 'rgb(255, 255, 255)' || 
              computedStyle.color === 'white' || 
              computedStyle.color === '#ffffff' || 
              computedStyle.color === '#fff' ||
              styles.color === 'white' ||
              styles.color === '#ffffff' ||
              styles.color === '#fff') {
            element.style.setProperty('color', '#000000', 'important');
          }
        });
      }
    }).then((canvas: HTMLCanvasElement) => {
      // Remove loading indicator
      modalContent.removeChild(loadingIndicator);
      
      // Convert canvas to image data URL
      const dataUrl = canvas.toDataURL('image/png');
      
      // Create title
      const title = document.createElement('h3');
      title.textContent = getViewTitle();
      title.style.margin = '0 0 10px 0';
      title.style.color = '#2c3e50';
      modalContent.appendChild(title);
      
      // Create image element
      const img = document.createElement('img');
      img.src = dataUrl;
      img.style.maxWidth = '100%';
      img.style.maxHeight = '60vh';
      img.style.objectFit = 'contain';
      img.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
      modalContent.appendChild(img);
      
      // Create download button
      const downloadBtn = document.createElement('button');
      downloadBtn.textContent = 'Download Image';
      downloadBtn.style.padding = '10px 20px';
      downloadBtn.style.backgroundColor = '#4CAF50';
      downloadBtn.style.color = 'white';
      downloadBtn.style.border = 'none';
      downloadBtn.style.borderRadius = '4px';
      downloadBtn.style.cursor = 'pointer';
      downloadBtn.style.fontSize = '14px';
      downloadBtn.style.marginTop = '10px';
      
      downloadBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        const filename = viewMode === 'year' 
          ? `calendar-${year}.png`
          : `calendar-${year}-${calendarData.months[selectedMonth].name.toLowerCase()}.png`;
        link.download = filename;
        link.href = dataUrl;
        link.click();
      });
      
      modalContent.appendChild(downloadBtn);
      
      // Create close button
      const closeBtn = document.createElement('button');
      closeBtn.textContent = 'Close';
      closeBtn.style.padding = '10px 20px';
      closeBtn.style.backgroundColor = '#f1f1f1';
      closeBtn.style.color = '#333';
      closeBtn.style.border = '1px solid #ddd';
      closeBtn.style.borderRadius = '4px';
      closeBtn.style.cursor = 'pointer';
      closeBtn.style.fontSize = '14px';
      closeBtn.style.marginTop = '5px';
      
      closeBtn.addEventListener('click', () => {
        document.body.removeChild(modalContainer);
      });
      
      modalContent.appendChild(closeBtn);
    }).catch((error: Error) => {
      console.error('Error exporting calendar as image:', error);
      modalContent.innerHTML = '<p style="color: #D32F2F; padding: 20px;">Failed to generate image. Please try again.</p>';
      
      // Add close button
      const closeBtn = document.createElement('button');
      closeBtn.textContent = 'Close';
      closeBtn.style.padding = '10px 20px';
      closeBtn.style.backgroundColor = '#f1f1f1';
      closeBtn.style.color = '#333';
      closeBtn.style.border = '1px solid #ddd';
      closeBtn.style.borderRadius = '4px';
      closeBtn.style.cursor = 'pointer';
      closeBtn.style.marginTop = '10px';
      
      closeBtn.addEventListener('click', () => {
        document.body.removeChild(modalContainer);
      });
      
      modalContent.appendChild(closeBtn);
    });
  }, [viewMode, year, selectedMonth, calendarData]);
  
  // Print calendar
  const printCalendar = useCallback(() => {
    const printContent = document.querySelector('.calendar-content');
    if (!printContent) return;
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow pop-ups to print the calendar.');
      return;
    }
    
    const title = getViewTitle();
    
    printWindow.document.write(`
      <html>
        <head>
          <title>${title}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 0;
              padding: 20px;
            }
            .print-header { 
              text-align: center; 
              margin-bottom: 30px; 
              border-bottom: 2px solid #333;
              padding-bottom: 20px;
            }
            .print-header h1 {
              margin: 0;
              color: #2c3e50;
              font-size: 28px;
            }
            .print-content { 
              margin: 0 auto; 
            }
            .calendar-content {
              width: 100%;
            }
            @media print {
              body { margin: 0; }
              .print-header { page-break-after: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="print-header">
            <h1>${title}</h1>
          </div>
          <div class="print-content">
            ${printContent.outerHTML}
          </div>
          <script>
            window.onload = function() { 
              window.print(); 
              setTimeout(function() { window.close(); }, 500); 
            }
          </script>
        </body>
      </html>
    `);
    
    printWindow.document.close();
  }, [viewMode, year, selectedMonth]);
  
  return (
    <div className="calendar-view" style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '20px' 
    }}>
      {/* Calendar Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        <h1 style={{ 
          margin: 0, 
          color: '#2c3e50',
          fontSize: '2rem',
          fontWeight: 'bold'
        }}>
          {getViewTitle()}
        </h1>
        
        <CalendarControls
          viewMode={viewMode}
          onViewChange={handleViewChange}
          onExport={exportAsImage}
          onPrint={printCalendar}
        />
      </div>
      
      {/* Calendar Content */}
      <div className="calendar-content">
        {viewMode === 'year' ? (
          <YearView
            calendarData={calendarData}
            onMonthClick={handleMonthSelect}
          />
        ) : (
          <MonthView
            monthData={calendarData.months[selectedMonth]}
            onNavigate={handleMonthNavigate}
            onBackToYear={handleBackToYear}
            canNavigatePrev={selectedMonth > 0}
            canNavigateNext={selectedMonth < 11}
          />
        )}
      </div>
    </div>
  );
};

export default CalendarView;