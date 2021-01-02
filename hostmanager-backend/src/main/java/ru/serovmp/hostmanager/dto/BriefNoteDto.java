package ru.serovmp.hostmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BriefNoteDto {
    private long id;
    private String title;
    private Date createdAt;
    private boolean isDone;
}
