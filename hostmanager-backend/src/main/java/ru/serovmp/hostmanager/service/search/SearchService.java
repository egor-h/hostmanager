package ru.serovmp.hostmanager.service.search;

import com.github.egorh.sonic.SonicPool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ru.serovmp.hostmanager.config.search.SearchMode;
import ru.serovmp.hostmanager.dto.*;
import ru.serovmp.hostmanager.entity.Host;
import ru.serovmp.hostmanager.entity.Note;
import ru.serovmp.hostmanager.repository.HostRepository;
import ru.serovmp.hostmanager.repository.NoteRepository;
import ru.serovmp.hostmanager.repository.ProtocolRepository;
import ru.serovmp.hostmanager.repository.TagRepository;
import ru.serovmp.hostmanager.service.HostService;
import ru.serovmp.hostmanager.service.NoteService;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ForkJoinWorkerThread;
import java.util.stream.Collectors;

@Service
public class SearchService {
    private static final long SEARCH_LIMIT = 5;
    private static final int SEARCH_PAGE_SIZE = 20;

    private HostRepository hostRepository;
    private ProtocolRepository protocolRepository;
    private TagRepository tagRepository;

    private HostService hostService;
    private NoteService noteService;

    private Searcher searcher;
    private List<Indexable> indexables;


    @Value("${hostsmanager.search.mode}")
    private SearchMode searchMode;

    public SearchService(HostRepository hostRepository, ProtocolRepository protocolRepository, TagRepository tagRepository, HostService hostService, NoteService noteService, Searcher searcher, List<Indexable> indexables) {
        this.hostRepository = hostRepository;
        this.protocolRepository = protocolRepository;
        this.tagRepository = tagRepository;
        this.hostService = hostService;
        this.noteService = noteService;
        this.searcher = searcher;
        this.indexables = indexables;
    }

    @PostConstruct
    void init() {
        if (searchMode.equals(SearchMode.NONE)) {
            return;
        }


    }

    public void indexData(String collection, String bucket, String id,  String data) {
        searcher.save(collection, bucket, id, data);
    }

    public void search(String collection, String bucket, String query, int limit, int offset) {
        searcher.find(collection, bucket, query, limit, offset);
    }

    public void search(String collection, String bucket, String query) {
        searcher.find(collection, bucket, query);
    }

    public void indexAlldata() {
        indexables.forEach(Indexable::startIndex);
    }


    public BriefSearchResultDto briefSearch(String query) {
        List<BriefSearchResultDto.BriefHost> hosts = hostService.find(query, PageRequest.of(0, (int) SEARCH_LIMIT));
        List<BriefNoteDto> notes = noteService.find(query, PageRequest.of(0, (int) SEARCH_LIMIT));
        List<ProtocolDto> protocols = protocolRepository.topRecents(query, SEARCH_LIMIT).stream()
                .map(proto -> new ProtocolDto(proto.getId(), proto.getName(), proto.getExecutionLine(), proto.getLaunchType().name(), proto.getValidationRegex(), proto.getExpectedExitCode()))
                .collect(Collectors.toList());
        List<TagDto> tags = tagRepository.topRecents(query, SEARCH_LIMIT).stream()
                .map(tag -> new TagDto(tag.getId(), tag.getName()))
                .collect(Collectors.toList());

        return BriefSearchResultDto.builder()
                .hosts(hosts)
                .notes(notes)
                .protocols(protocols)
                .tags(tags)
                .build();
    }

    public List<BriefSearchResultDto.BriefHost> searchHosts(String query, int page) {
        return hostRepository.textSearchByHostNameOrAddressPagable(query, PageRequest.of(page, SEARCH_PAGE_SIZE)).stream()
                .map(host -> new BriefSearchResultDto.BriefHost(host.getId(), host.getName(), host.getAddress()))
                .collect(Collectors.toList());
    }
}
