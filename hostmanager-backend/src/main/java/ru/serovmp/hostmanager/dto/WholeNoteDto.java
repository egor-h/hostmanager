package ru.serovmp.hostmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class WholeNoteDto {
    private long id;
    private String title;
    private String text;
    private boolean done;
    private Date createdAt;
    //    private User createdBy;
    private Date doneAt;
}
